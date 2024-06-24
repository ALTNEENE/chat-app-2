import {TiMessages} from 'react-icons/ti'
import { useAuthContext } from "../../context/useAuthContext"
import { jwtDecode } from "jwt-decode"
import useConversation from '../../zustand/useConversation'

const NoChatSelected = () => {
    return (
      <>
        <div className='flex justify-center items-center w-full h-full p-4'>
          <div className='flex flex-col text-white text-center gap-2 text-lg font-semibold'>
            <p>Say Hi! to start massaging !!</p>
            <div className='flex align-center justify-center'>
              <TiMessages className="text-6xl text-center" />
            </div>
          </div>
        </div>
      </>
    )
  }

export default NoChatSelected