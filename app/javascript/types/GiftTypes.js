// @flow
export type Gift = {
  id: number,
  title: ?string,
  description: ?string,
  imageUrl: ?string,
  image?: *,
  receiverName: ?string,
  receiverId: ?number,
  stealCountRemaining: number
}