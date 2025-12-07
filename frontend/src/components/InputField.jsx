export default function InputField({ icon, type, placeholder }) {
  return (
    <div className="flex gap-1 items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent w-full outline-none placeholder-[#bbb0b2] dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
      />
    </div>
  );
}
