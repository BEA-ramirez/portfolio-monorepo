export default function LoginPage() {
  return (
    <div className="font-mono flex flex-col flex-1 bg-[#0a0a0a] items-center justify-center">
      <div className="w-95 border border-white bg-[#111] rounded-lg p-8 px-12">
        <h1 className="mb-1 text-body font-semibold">~/admin</h1>
        <p className="text-small font-light">Sign in to manage content.</p>
        <div className="flex flex-col gap-3 mt-6">
          <div className="flex flex-col gap-0.5">
            <label className="text-xsmall">email*</label>
            <input
              type="text"
              className="border border-white px-3 py-2 rounded-md text-small"
            />
          </div>
          <div className="flex flex-col gap-0.5 ">
            <label className="text-xsmall">password*</label>
            <input
              type="password"
              className="border border-white px-3 py-2 rounded-md text-small"
            />
          </div>
          <button className="mt-3 px-4 py-3 text-sm flex items-center justify-center gap-3 bg-violet-500 rounded-md">
            send magic link
          </button>
        </div>
      </div>
    </div>
  );
}
