import { FunctionComponent, useState } from 'react'
import { IconType } from 'react-icons'
import { CircularProgress, Button as MUIButton, ButtonProps as MUIButtonProps, Theme, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Typography } from '.'

export interface CommonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  readonly isLoading?: boolean
  readonly width?: 'compact' | 'default' | 'full' | 'icon'
  readonly target?: string
  readonly href?: string
  readonly Icon?: IconType
  readonly as: 'common' | 'border'
  readonly component?: 'a' | 'button'
}

type ConditionalProps =
  | {
      readonly variant?: never
      readonly gradient?: keyof Theme['gradients']
      readonly color?: never
    }
  | {
      readonly variant?: 'primary'
      readonly gradient?: keyof Theme['gradients']
      readonly color?: never
    }
  | {
      readonly variant?: 'secondary' | 'outlined'
      readonly color?: keyof Theme['colors']
      readonly gradient?: never
    }

export type ButtonProps = CommonProps & ConditionalProps

type BorderProps = {
  isHovered: boolean
}
const GradientButton = styled(MUIButton, {
  shouldForwardProp: prop => prop !== 'isHovered'
})<BorderProps>(({ theme, isHovered }) =>
  theme.unstable_sx({
    background: 'linear-gradient(101.63deg,#28a1c0 8.53%,#16489c 107.27%)',
    position: 'relative',
    outline: 'none',
    borderRadius: '4px',
    border: '1.5px solid',
    transition: 'all 0.3s ease',
    px: 2,
    '& > p > svg': {
      color: '#28a1c0'
    },
    '&:hover': {
      boxShadow: '0px 4px 7.5px rgba(0, 0, 0, 0.1)',
      '& p': {
        background: '-webkit-linear-gradient(#fff, #fff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: '#fff',
        '& > svg': {
          color: '#fff'
        }
      }
    },
    '&:before': {
      position: 'absolute',
      top: isHovered ? -1 : 1,
      left: isHovered ? -1 : 1,
      right: isHovered ? -1 : 1,
      bottom: isHovered ? -1 : 1,
      background: isHovered ? 'linear-gradient(101.63deg,#28a1c0 8.53%,#16489c 107.27%)' : '#fff',
      content: '""',
      zIndex: 1,
      borderRadius: isHovered ? '4px' : '2px'
    }
  })
)
/**
 * Implements Material UI Button.
 * See https://mui.com/material-ui/api/button/ for extra props.
 * Native `button` and `a` element attributes are also available to use.
 */
const Button: FunctionComponent<ButtonProps> = ({
  children,
  color = 'white',
  gradient = 'btn',
  disabled = false,
  isLoading = false,
  variant = 'primary',
  width = 'default',
  onClick,
  Icon,
  as = 'common',
  sx,
  component = 'button',
  ...rest
}) => {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const widthStyles = {
    compact: {
      maxWidth: 'max-content'
    },
    default: {
      width: '100%',
      maxWidth: '340px'
    },
    full: {
      width: '100%'
    },
    icon: {
      height: '40px',
      minWidth: '40px',
      p: 0,
      width: '40px'
    }
  }

  const variantStyles = {
    primary: {
      background: theme.gradients[gradient],
      color: theme.colors.white,
      px: 2.25,
      py: 1.25,

      '&.Mui-disabled': {
        color: theme.colors.white
      }
    },
    secondary: {
      backgroundColor: theme.colors.black,
      border: `2px solid ${theme.colors.grey500}`,
      '&:hover': {
        backgroundColor: theme.colors.black,
        borderColor: theme.colors.grey300
      }
    },
    outlined: {
      border: `2px solid ${theme.colors[color]}`,
      '&:hover': {
        background: theme.colors.activeBackground
      }
    }
  }

  return (
    <>
      <MUIButton
        disabled={isLoading || disabled}
        component={component}
        sx={{
          color: theme.colors[color],

          fontWeight: 400,
          height: 'max-content',
          lineHeight: '20px',
          minWidth: '100px',
          opacity: disabled ? 0.4 : undefined,
          overflow: 'hidden',
          px: 2,
          py: 1,
          borderRadius: '6px',
          textTransform: 'none',
          boxShadow: theme.customShadows.z8,
          ...(as === 'border' && { display: 'none' }),
          '&.Mui-disabled': {
            color: theme.colors[color]
          },
          ...widthStyles[width],
          ...variantStyles[variant],
          ...sx
        }}
        onClick={onClick}
        {...rest}
      >
        {isLoading ? (
          <CircularProgress
            disableShrink
            size={20}
            sx={{
              color: variant === 'primary' ? theme.colors.white : theme.colors[color]
            }}
          />
        ) : (
          children
        )}
      </MUIButton>

      <GradientButton
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isHovered={isHovered}
        sx={{ ...(as === 'common' && { display: 'none' }) }}
      >
        <Typography
          sx={{
            background: '-webkit-linear-gradient(#28a1c0, #16489c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1rem',
            fontWeight: 500,
            fontFamily: 'Poppins',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.2,
            zIndex: 2
          }}
        >
          {Icon && (
            <Icon
              style={{
                fontWeight: 600,
                fontSize: '1rem',
                marginRight: 2
              }}
            />
          )}{' '}
          {children}
        </Typography>
      </GradientButton>
    </>
  )
}

export default Button
