
import { getMe } from "@/services/getMe";


export default async function Home () {
  const user = await getMe()
  // console.log(user, 'me');
  
  return (
    <div>
    karia
    </div>
  );
}
