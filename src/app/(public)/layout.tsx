interface PublicLayoutProps {
  readonly children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = async ({ children }) => {

  return (
    <div>
      {children}
    </div>
  )
}

export default PublicLayout;