import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  // providers: 여러 로그인방식 지원(ex. 카카오, 구글 등)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "test@emoney.co.kr",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        // DB에서 username을 찾고 비밀번호가 맞는지 체크해서 맞으면 해당 user의 정보를 리턴
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("token", token);
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      console.log("session", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
