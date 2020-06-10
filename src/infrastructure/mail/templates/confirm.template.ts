export const ConfirmTemplate = (login: string, confirmLink: string) => {
  return `
                <h3>Hello ${login}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `;
};
