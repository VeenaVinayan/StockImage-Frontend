import React, { useState , useEffect} from 'react'
interface EditImageProps {
     title : string;
     url:string;
     onSave: (file : File,value:string)=> void;
}
const EditImage :React.FC <EditImageProps>= ({title,url,onSave}) => {
  const [ preview, setPreview ] = useState('') ;
  const [ value,setValue ] =useState('');
  const [file,setFile] = useState<File>();

  useEffect(() =>{
        setPreview(url);
        setValue(title);
    },[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file){
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setFile(file);
     }
  }   
  const handleTitle = (e:React.ChangeEvent<HTMLInputElement>) =>{
     setValue(e.target.value);
  }
  const handleClick = () =>{
    if(file && value){
        onSave(file,value);
    }
  }
  return (
  <>
  <div className="space-y-6">
  
    <div className="flex flex-col items-center">
      <img
        src={preview}
        alt="Preview"
        className="w-full max-w-xs rounded-md shadow-md border"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        type="text"
        value={value}
        onChange={handleTitle}
        placeholder="Enter a title"
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Replace Image</label>
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
    </div>
    <button onClick={handleClick}> Save</button>    
  </div>
</>

  )
}

export default EditImage
