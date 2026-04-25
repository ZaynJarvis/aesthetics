import { Gallery } from "@/components/Gallery";
import { loadGallery } from "@/lib/data";

export const dynamic = "force-static";

export default async function Page() {
  const data = await loadGallery();
  return <Gallery data={data} />;
}
