import { styled } from "../../../../styles";

export const CartItemContainer = styled("div", {
    display: 'flex',
    gap: '1.25rem',
});

export const ImageContainer = styled("div", {
  width: '100%',
  maxWidth: 102,
  height: 93,
  backgroundImage: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const InfoContainer = styled("div", {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,

  span: {
    fontSize: '$md',
    fontWeight: 400,
    lineHeight: '160%',
    color: '$gray300',
    // Configuração para nomes grandes
    overflow: 'hidden',
    textOverflow: 'ellipsis', //os 3 potinhos
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1, //número máximo de linha que o parágrafo terá, tudo depois é representado pelo ...
  },

  strong: {
    fontSize: '$md',
    fontWeight: 700,
    lineHeight: '160%',
    color: '$gray100',
  },

  button: {
    marginTop: 'auto',
    border: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '160%',
    color: '$green500',
    transition: 'color 0.4s',

    '&:hover': {
      color: '$green300',
    },
  }
});