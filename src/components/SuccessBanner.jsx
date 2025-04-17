function SuccessBanner({ title, message }) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-green-600">{title}</h2>
        <p className="mt-2 text-gray-700">{message}</p>
      </div>
    );
  }
  
  export default SuccessBanner;
// This component is a simple success banner that displays a title and message.  