export const ResetPasswordTemplate = (login: string, confirmLink: string) => {
  return `
                <h3>Hello ${login}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to reset your password.</p>
            `;
};
