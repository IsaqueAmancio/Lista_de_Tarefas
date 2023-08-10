const input_tarefa = document.querySelector(".input_tarefa")
const btn_enviar = document.querySelector(".btn_enviar")
const lista_tarefas = document.querySelector(".lista_tarefa")

input_tarefa.addEventListener("keydown", function(e){
    const n_key = e.key
    let text_input_tarefa = input_tarefa.value;
    if(e.key === "Enter" && text_input_tarefa !=""){
        cria_tarefa(input_tarefa.value);            //cria uma tarefa se a tecla enter for pressionada na caixa de texto;
        clear_input();
    }
});
btn_enviar.addEventListener("click",function(){
    if(!input_tarefa.value) return;                             //cria uma tarefa quando o botão de enviar é pressionado 
    cria_tarefa(input_tarefa.value);
});
document.addEventListener("click",function(e){
    const el = e.target;
    if(el.classList.contains("apagar_li")){                     //apaga a tarefa se o botão apagar for pressionado 
        el.parentElement.remove();
        salvar_tarefa();
    }
    
})
document.addEventListener("click",function(i){
    let event = i.target;
    if(event.classList.contains("alterar_li")){
        let alt_tarefa = event.parentElement
        const li_limpa = cria_li();
        alt_tarefa.innerText = ""                               //limpa e cria uma caixa de texto na tarefa quando o botão alterar é pressionado 
        const input_alt = document.createElement("input")
        input_alt.setAttribute("type","text");
        input_alt.setAttribute("class","input_text_alterar");
        alt_tarefa.appendChild(input_alt)
    }
})
document.addEventListener("keypress", function (u){
    let evento = u.target
    let name_key = u.key
    if(name_key === "Enter"){
        if(evento.classList.contains("input_text_alterar")){    // Troca o nome da tarefa 
            evento_texto = evento.value         
            let li_evento = evento.parentElement
            li_evento.innerText = evento_texto
            cria_btns(li_evento)
        }
    }       
})
function cria_li(){
    const li = document.createElement("li")                     // cria a lista das tarefas 
    return li ; 
};
function cria_tarefa(text_input){
    const li =  cria_li();
    li.innerText = text_input;                                  //  cria a tarefa 
    lista_tarefas.appendChild(li);
    cria_btns(li);
    clear_input();
    salvar_tarefa();
};
function clear_input(){
    input_tarefa.value = "";                                    //  limpa a caixa de texto 
    input_tarefa.focus();
};
function cria_btns(li){
    li.innerText += " "
    const btn_remover = document.createElement("button")
    btn_remover.innerText = "apagar";                            // cria o botão apagar e alterar atrelado a uma nova tarefa 
    btn_remover.setAttribute("class","apagar_li");
    li.appendChild(btn_remover);
    const btn_alterar = document.createElement("button")     
    btn_alterar.innerText = "alterar"
    btn_alterar.setAttribute("class","alterar_li")
    li.appendChild(btn_alterar)
};
function salvar_tarefa(){
    const texto_ul = lista_tarefas.querySelectorAll("li");
    let lista_tf = []
    let textoul = texto_ul.innerText;
    if(textoul == undefined){
        const arquivoJson = JSON.stringify(lista_tf);
        localStorage.setItem("st_tarefas",arquivoJson)
    }
    for (let tarefas of texto_ul){
        let textoDaTarefa = tarefas.innerText;                  //salva arquivo com as  tarefas 
        tf = textoDaTarefa.replace('apagar','').trim();
        tf = tf.replace('alterar',' ').trim()
        console.log(tf)
        lista_tf.push(tf)
        const arquivoJson = JSON.stringify(lista_tf);
        localStorage.setItem("st_tarefas",arquivoJson)
    }
    
}
function carregarTarefas(){
     const lista = localStorage.getItem("st_tarefas")
     const lista_tf = JSON.parse(lista)                         // carrega as tarefas salvas 
     for(let tf of lista_tf){
        cria_tarefa(tf);
     }
}
carregarTarefas()