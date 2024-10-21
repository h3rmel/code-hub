type Props = {
    children: JSX.Element
}

const CardContainer = ({children}: Props) => {
  return (
    <div className="mt-8 grid lg:grid-cols-3 gap-10">{children}</div>
  )
}

export default CardContainer