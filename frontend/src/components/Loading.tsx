import Body from './Body'

const Loading = () => {
  return (
    <Body>
      <div className="py-8 text-3xl font-bold text-black">Loading</div>
      <div className="py-4 text-black">Waiting for response from server...</div>
      <div className="py-4 italic text-gray-400">Not Found</div>
    </Body>
  )
}

export default Loading
