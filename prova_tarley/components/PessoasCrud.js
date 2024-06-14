
const URL = 'https://api-exame-dot-api-samples-423102.uc.r.appspot.com/api/exames'

export async function findAll() {
  const requestInit = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 12115423',
    },
  };
  const responseHttp = await fetch(URL, requestInit);
  if (responseHttp.ok) {
    const dados = await responseHttp.json();
    
    return dados;
} else {
    throw new Error(
        'Falha ao tentar obter os contatos. Tente novamente em alguns minutos.'
    );
}
}

export async function remove(id) {
  
  const requestInit = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer 12115423',
    }
  }

  console.log('Executando DELETE /contatos/' + id)
  const responseHttp = await fetch(`${URL}/${id}`, requestInit)

  if(responseHttp.ok) {
    console.log('Sucesso')
    const requestBody = await responseHttp.json()
    return requestBody.data
  } else {
    console.log('Erro')
    throw new Error('Falha ao tentar remover o contato. Tente novamente em alguns minutos.')
  }
}

export async function save(descricao, data, preco, paciente) {
  const requestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 12115423'
    },
    
    body: JSON.stringify({
      descricao: descricao,
      data: data,
      preco: preco,
      paciente: paciente
    })
  }
  const responseHttp = await fetch(URL, requestInit);
  console.log('aqui ')
  if (responseHttp.ok) {
    console.log('aqui chegou')
    const dados = await responseHttp.json();
    
    return dados;
} else {
    throw new Error(
        'Falha ao tentar obter os contatos. Tente novamente em alguns minutos.'
    );
}
  }
  

export async function update(id, descricao, data, preco, paciente) {
  const requestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 12115423'
    },
    body: JSON.stringify({
      descricao: descricao,
      data: data,
      preco: preco,
      paciente: paciente
    })
  }
  const responseHttp = await fetch(URL, requestInit);
  console.log('aqui ')
  if (responseHttp.ok) {
    console.log('aqui chegou')
    const dados = await responseHttp.json();
    
    return dados;
} else {
    throw new Error(
        'Falha ao tentar obter os contatos. Tente novamente em alguns minutos.'
    );
}
}