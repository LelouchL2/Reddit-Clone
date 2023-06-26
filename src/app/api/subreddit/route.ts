import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = SubredditValidator.parse(body);

    const subredditExists = await db.subreddit;
  } catch (error) {}
}
