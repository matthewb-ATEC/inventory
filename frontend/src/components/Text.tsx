interface TextProps {
  text: string
  className?: string
}

export const Title = ({ text, className }: TextProps) => {
  return (
    <div className={`${className} text-lg text-text-primary font-bold`}>
      {text}
    </div>
  )
}

export const Subtitle = ({ text, className }: TextProps) => {
  return (
    <div className={`${className} text-md text-text-secondary font-normal`}>
      {text}
    </div>
  )
}

export const Header = ({ text, className }: TextProps) => {
  return (
    <div
      className={`text${className} -sm text-text-secondary font-normal uppercase`}
    >
      {text}
    </div>
  )
}

export const Text = ({ text, className }: TextProps) => {
  return (
    <div className={`${className} text-md text-text-muted font-normal`}>
      {' '}
      {text}
    </div>
  )
}

export const Subtext = ({ text, className }: TextProps) => {
  return (
    <div className={`${className} text-sm text-text-muted font-light`}>
      {text}
    </div>
  )
}
