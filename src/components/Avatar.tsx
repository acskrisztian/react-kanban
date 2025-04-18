const Avatar: React.FC<{ name: string }> = ({ name }) => {
  const getFirstLetter = () => {
    return name.charAt(0).toUpperCase();
  };
  return (
    <div className="w-[24px] h-[24px] flex items-center justify-center rounded-full border border-primary text-primary text-[16px] leading-[16px]">
      {getFirstLetter()}
    </div>
  );
};

export default Avatar;
