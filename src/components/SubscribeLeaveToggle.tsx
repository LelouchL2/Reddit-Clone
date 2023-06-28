"use client";
import { FC, startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";
// import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useToast } from "../hooks/use-toast";

interface SubscribeLeaceToogleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
}

const SubscribeLeaceToogle: FC<SubscribeLeaceToogleProps> = ({
  subredditId,
  subredditName,
  isSubscribed,
}) => {
  // const isSubscribed = false;
  const { toast } = useToast();
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          // console.log("Unauthorized User");
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "UnSubscribed",
        description: `You are now subscribed to ${subredditName}`,
        variant: "default",
      });
      ``;
    },
  });
  const { mutate: unSubscribe, isLoading: isUnSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          // console.log("Unauthorized User");
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Subscribed",
        description: `You are now Unsubscribed from ${subredditName}`,
        variant: "default",
      });
    },
  });

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnSubLoading}
      onClick={() => unSubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaceToogle;
