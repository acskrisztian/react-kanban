import useUser from "@/hooks/useUser";

const Header = () => {
  const user = useUser();
  const getFirstLetter = () => {
    return user?.username.charAt(0).toUpperCase();
  };
  return (
    <header className="p-[16px] lg:p-[24px] shadow flex items-center justify-between">
      <div>Title</div>
      <div className="flex items-center gap-[8px]">
        <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full border border-primary">
          {getFirstLetter()}
        </div>
      </div>
    </header>
  );
};

export default Header;
