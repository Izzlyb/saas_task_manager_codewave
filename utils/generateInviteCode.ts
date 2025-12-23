
export const generateInviteCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let inviteCode = ""

  for( let i = 0; i < 6; i++ ) {
    const randomIdx = Math.floor(Math.random() * characters.length);
    inviteCode += characters[randomIdx];
  }

  return inviteCode;
}