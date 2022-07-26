import Modal from '../Modal/Modal'
import db from '../../firebaseConfig.js'
import { collection, addDoc } from 'firebase/firestore'
import { useState,useContext } from 'react'
import { CartContext } from '../../Context/CartContext'

const Pagar = ()=>{

    const [showModal, setShowModal] = useState(false)
    const [success, setSuccess] = useState()
    const {cartPro,totalPrecio} =useContext(CartContext);



    const handleChange = (e) => {
        console.log("valor general. ",e.target.name)
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const submitData = (e) => {
        e.preventDefault()
        console.log("order para enviar: ", {...order, buyer: formData})
        pushData({...order, buyer: formData})
    }

    const pushData = async (newOrder) => {
        const collectionOrder = collection(db, 'ordenes')
        const orderDoc = await addDoc(collectionOrder, newOrder)
        setSuccess(orderDoc.id)
        console.log('ORDEN GENERADA', orderDoc)
    }

    const [order, setOrder] = useState({
        items: cartPro.map((product) => {
            return {
                id: product.id,
                titulo: product.titulo,
                precio: product.precio
            }
        } ),
        buyer: {},
        date: new Date().toLocaleString(),
        total: totalPrecio
    })
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email:''
    })

    return(
        <div className="pagar-todo">
                  
            <button onClick={() => setShowModal(true)} className="pagar">Ir a pagar</button>
            { showModal &&
            <Modal title="datos de contacto" close={()=>setShowModal()}> 
            {success ? ( <>
            <h2>su orden se genero exitosamente</h2>
            <p> Su codigo de segimiento es: {success}</p>
            </>):
              (
                <form onSubmit={submitData}>
                 <input 
                    type='text' 
                    name='name' 
                    placeholder='Nombre'
                    onChange={handleChange}
                    value={formData.name}
                    />
                 <input 
                    type='number' 
                    name='phone'  
                    placeholder='Telefono'                   
                    value={formData.phone}
                    onChange={handleChange}
                    />
                 <input 
                    type='email' 
                    name='email'  
                    placeholder='Email'
                    value={formData.email}  
                    onChange={handleChange}
                    />
                    
                    <button type='submit'>Enviar</button>
                </form>
                )}
            </Modal>
            }
        </div>
    )
}

export default Pagar