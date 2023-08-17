import prisma from "@/app/lib/prisma";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const secret = process.env.JWT_SECRET;

  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && body.password === user.password) {
    const { password, ...userWithoutPass } = user;

    console.log("userWithoutPass", userWithoutPass);

    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
}
