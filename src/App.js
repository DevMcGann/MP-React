
import './App.css';
import React from 'react';

import { gql, useMutation } from '@apollo/client';


//https://saleor-service-dev.herokuapp.com/graphql 
//“createMercadoPagoPreference”: “225602784-ab4b05d2-c93a-4c1c-b4be-4ba52dcc4d71”

/*
mutation {
  createMercadoPagoPreference(
    input: {
      items: [
        { title: “Ropa de moda”, unit_price: 120, quantity: 1 }
        { title: “Pantalones A4", unit_price: 100, quantity: 1 }
      ]
    }
  )
}
5:36
mutation crearPref ($input : [CreatePreferenceInput!]!  ) {
  createMercadoPagoPreference(
    input: {
      items: $input
    }
  )
}

const GET_PREFERENCE =  gql`
  mutation createMercadoPagoPreference {
    createMercadoPagoPreference(
      input: {
        items: 
      }
    )
}
`;
*/ 

function App(props) {

  const itemsArray = [
    {title : "remera", unit_price: 10, quantity: 1},
    {title : "pantalon", unit_price: 30, quantity: 1}
  ]
   
const [myPref, setMyPref] = React.useState(null)
// const [items, setItems] = React.useState(itemsArray)



  const GET_PREFERENCE =  gql`
  mutation createMercadoPagoPreference ($input : [CreatePreferenceInput!]!  ) {
    createMercadoPagoPreference(
      input: {
        items: $input
      }
    )
  }
`;
const [createMercadoPagoPreference] = useMutation(GET_PREFERENCE)


React.useEffect(() => {
  set_preference(itemsArray)
  setMercadoPagoPreferences();
}, []);

  const setMercadoPagoPreferences = async () => {
    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.async = true;
    script.setAttribute('data-preference-id', "225602784-ab4b05d2-c93a-4c1c-b4be-4ba52dcc4d71");
    document.getElementById('mercadoForm').appendChild(script);
  };



const set_preference =  async (items) => {
  try {
    const {data} = await createMercadoPagoPreference({
      variables: {
        input: items
      }
    })
    //console.log(JSON.stringify(data.createMercadoPagoPreference))
    if (data) {
      setMyPref(JSON.stringify(data.createMercadoPagoPreference))
    }

    console.log(myPref)
  
  } catch (error) {
    console.log(error)
  }
}



 


  return (
    
    <div className="App">
      <header className="App-header">
        
        <p>Prueba Mercadopago Checkout React</p>

        <form action="/" method="POST" id="mercadoForm" />      
      
      </header>
    </div>
  );
}

export default App;
