const Error = ({ errorMessage }) => {
  return (
    <div className='h-full flex flex-col items-center justify-center select-none space-y-5'>
      <p className='text-3xl font-semibold'>¯\_(ツ)_/¯</p>
      <p className='text-center font-bold text-xl'>
        ERROR{!!errorMessage && ' in '}{errorMessage}!
      </p>
    </div>
  );
};

export default Error;
