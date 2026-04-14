import { create } from 'zustand';

export type DemographicStep = 'age' | 'education' | 'economics' | 'orientation';

export interface UserProfile {
  walletAddress: string;
  demographics: {
    ageRange?: string;
    education?: string;
    economicStatus?: string;
    politicalOrientation?: string;
  };
  onboardingComplete: boolean;
}

interface AuthState {
  isConnected: boolean;
  isConnecting: boolean;
  showConnectModal: boolean;
  showOnboarding: boolean;
  currentOnboardingStep: DemographicStep;
  user: UserProfile | null;

  openConnectModal: () => void;
  closeConnectModal: () => void;
  simulateConnect: () => void;
  disconnect: () => void;
  startOnboarding: () => void;
  setDemographic: (key: keyof UserProfile['demographics'], value: string) => void;
  nextOnboardingStep: () => void;
  completeOnboarding: () => void;
}

const ONBOARDING_STEPS: DemographicStep[] = ['age', 'education', 'economics', 'orientation'];

export const useAuthStore = create<AuthState>((set, get) => ({
  isConnected: false,
  isConnecting: false,
  showConnectModal: false,
  showOnboarding: false,
  currentOnboardingStep: 'age',
  user: null,

  openConnectModal: () => set({ showConnectModal: true }),
  closeConnectModal: () => set({ showConnectModal: false }),

  simulateConnect: () => {
    set({ isConnecting: true });
    // Simulate wallet connection delay
    setTimeout(() => {
      set({
        isConnecting: false,
        isConnected: true,
        showConnectModal: false,
        showOnboarding: true,
        user: {
          walletAddress: '0x7a3F...e92B',
          demographics: {},
          onboardingComplete: false,
        },
      });
    }, 1500);
  },

  disconnect: () => {
    set({
      isConnected: false,
      isConnecting: false,
      showConnectModal: false,
      showOnboarding: false,
      currentOnboardingStep: 'age',
      user: null,
    });
  },

  startOnboarding: () => set({ showOnboarding: true }),

  setDemographic: (key, value) => {
    const user = get().user;
    if (!user) return;
    set({
      user: {
        ...user,
        demographics: { ...user.demographics, [key]: value },
      },
    });
  },

  nextOnboardingStep: () => {
    const currentIdx = ONBOARDING_STEPS.indexOf(get().currentOnboardingStep);
    if (currentIdx < ONBOARDING_STEPS.length - 1) {
      set({ currentOnboardingStep: ONBOARDING_STEPS[currentIdx + 1] });
    } else {
      get().completeOnboarding();
    }
  },

  completeOnboarding: () => {
    const user = get().user;
    if (!user) return;
    set({
      showOnboarding: false,
      user: { ...user, onboardingComplete: true },
    });
  },
}));
