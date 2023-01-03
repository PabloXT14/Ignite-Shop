import { styled } from "..";

export const HomeContainer = styled("main", {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))', // 1180 + ((largura da tela - 1180) / 2)
  marginLeft: 'auto',
  minHeight: 'calc(2rem - 100vh)',
  marginBottom: '1rem',
})

export const Product = styled("div", {
  backgroundImage: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
});

export const ProductFooter = styled("footer", {
  position: 'absolute',
  bottom: '0.25rem',
  left: '0.25rem',
  right: '0.25rem',
  padding: '2rem',

  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  justifyContent:'space-between',
  
  backgroundColor: 'rgba(0, 0, 0, 0.6)',

  transform: 'translateY(110%)',
  opacity: 0,
  transition: 'all 0.2s ease-in-out',

  div: {
    display: 'flex',
    flexDirection: 'column',  
  },

  strong: {
    fontSize: '$lg',
    color: '$gray100',
    lineHeight: '160%',
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
    color: '$green300',
    lineHeight: '140%',
  },
});


export const ArrowButton = styled("button", {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '$white',
  zIndex: 999,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',

  variants: {
    direction: {
      left: {
        left: 0,
      },

      right: {
        right: 0,
      }
    }
  }
})
