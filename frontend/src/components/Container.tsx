interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex flex-col h-full flex-grow space-y-4 bg-container-light p-8 rounded-md shadow-md">
      {children}
    </div>
  )
}

export default Container
