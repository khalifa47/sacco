export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid;
  return new Response(`Hello, USER ${uid}!`);
}
