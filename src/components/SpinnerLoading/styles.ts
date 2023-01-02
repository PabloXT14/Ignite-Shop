import { styled, keyframes } from "../../styles";

const skChase = keyframes({
  '100%': { transform: 'rotate(360deg)' },
});

const skChaseDot = keyframes({
  '80%, 100%': { transform: 'rotate(360deg)' },
});

const skChaseDotBefore = keyframes({
  '50%': {
    transform: 'scale(0.4)'
  },
  '100%, 0%': { 
    transform: 'scale(1)' 
  },
});

export const SpinnerContainer = styled('div', {
  margin: '0 auto',
  alignSelf: 'center',
  justifySelf: 'center',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > div': {
    // width: '2rem',
    // height: '2rem',
    position: 'relative',
    animation: `${skChase} 2.5s infinite linear both`
  },

  '.sk-chase': {
    // width: '2.5rem',
    // height: '2.5rem',
    position: 'relative',
    animation: `${skChase} 2.5s infinite linear both`,
  },

  '.sk-chase-dot': {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    animation: `${skChaseDot} 2s infinite ease-in-out both`
  },

  '.sk-chase-dot:before': {
    content: '',
    display: 'block',
    width: '25%',
    height: '25%',
    backgroundColor: '$gray300',
    borderRadius: '100%',
    animation: `${skChaseDotBefore} 2s infinite ease-in-out both`,
  },

  '.sk-chase-dot:nth-child(1)': {
    animationDelay: '-1.1s',
  },

  '.sk-chase-dot:nth-child(2)': {
    animationDelay: '-1s',
  },

  '.sk-chase-dot:nth-child(3)': {
    animationDelay: '-0.9s',
  },

  '.sk-chase-dot:nth-child(4)': {
    animationDelay: '-0.8s',
  },

  '.sk-chase-dot:nth-child(5)': {
    animationDelay: '-0.7s',
  },

  '.sk-chase-dot:nth-child(6)': {
    animationDelay: '-0.6s',
  },

  '.sk-chase-dot:nth-child(1):before': {
    animationDelay: '-1.1s',
  },

  '.sk-chase-dot:nth-child(2):before': {
    animationDelay: '-1s',
 },

  '.sk-chase-dot:nth-child(3):before': {
    animationDelay: '-0.9s',
  },

  '.sk-chase-dot:nth-child(4):before': {
    animationDelay: '-0.8s',
  },

  '.sk-chase-dot:nth-child(5):before': {
    animationDelay: '-0.7s',
  },

  '.sk-chase-dot:nth-child(6):before': {
    animationDelay: '-0.6s',
  },

  variants: {
    size: {
      sm: {
        '& > div': {
          width: '1rem',
          height: '1rem',
        },
        '.sk-chase': {
          width: '1.5rem',
          height: '1.5rem',
        }
      },
      md: {
        '& > div': {
          width: '2rem',
          height: '2rem',
        },
        '.sk-chase': {
          width: '2.5rem',
          height: '2.5rem',
        }
      },
      lg: {
        '& > div': {
          width: '3rem',
          height: '3rem',
        },
        '.sk-chase': {
          width: '3.5rem',
          height: '3.5rem',
        }
      },
    }
  },

  defaultVariants: {
    size: "md",
  }
})
