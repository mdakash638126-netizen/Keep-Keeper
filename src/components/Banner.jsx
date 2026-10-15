
import { UserRoundPlus, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <section className="px-4 pb-5 pt-10 text-center sm:pt-12">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#e4eee9] text-[#214d40]">
          <Heart size={19} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
          Friends to keep close in your life
        </h1>

        <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-gray-500 sm:text-sm">
          Stay connected with the people who matter most.
          Build stronger friendships, one check-in at a time.
        </p>

        <button
          onClick={() =>
            navigate("/?action=add-friend", { preventScrollReset: false })
          }
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#214d40] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#183b31]"
        >
          <UserRoundPlus size={15} />
          Add a Friend
        </button>
      </div>
    </section>
  );
}
