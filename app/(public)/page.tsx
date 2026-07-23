
import { getMe } from "@/services/getMe";


export default async function Home () {
  const user = await getMe()

  return (
    <div>
    karia
    </div>
  );
}
