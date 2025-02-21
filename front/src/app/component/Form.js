export default function Form({ forms }) {
    async function handleResposta(id, mensagem) {
      await fetch(`http://strapi:1337/api/forms/${id}`, {  // Alterado para `strapi`
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { resposta: mensagem } })
      });
    }
  
    return (
      <ul>
        {forms.length > 0 ? (
          forms.map((form) => (
            <li key={form.id}>
              <strong>{form.attributes.nome}</strong>: {form.attributes.mensagem}
              <form onSubmit={(e) => {
                e.preventDefault();
                const resposta = e.target.elements.resposta.value;
                handleResposta(form.id, resposta);
              }}>
                <input type="text" name="resposta" placeholder="Responder..." />
                <button type="submit">Enviar</button>
              </form>
              {form.attributes.resposta && <p>Resposta: {form.attributes.resposta}</p>}
            </li>
          ))
        ) : (
          <li>Nenhum formulário enviado ainda.</li>
        )}
      </ul>
    );
  }
  