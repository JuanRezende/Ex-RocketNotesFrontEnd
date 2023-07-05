import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { Container, Form } from "./styles";

import { api } from '../../services/api'

export function New() {
  const [title, setTitle] = useState("");
  const [description, SetDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  function handleAddLink(){
    if(!newLink){
      return alert('Para adicionar um "Novo Link" você deve preencher o campo.')
    }

    setLinks(prevState => [...prevState, newLink])
    setNewLink("");
  }

  function handleRemoveLink(linkDeleted){
    setLinks(prevState => prevState.filter(link => link !== linkDeleted));
  }

  function handleAddTag(){
    if(!newTag){
      return alert('Para adicionar uma "Nova Tag" você deve preencher o campo.')
    }

    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(tagDeleted){
    setTags(prevState => prevState.filter(tag => tag !== tagDeleted));
  }

  async function handleNewNote(){
    if(!title){
      return alert('Digite o título da nota para salvar.')
    }

    if(newLink){
      return alert('Você deixou um "Link" no campo para adicionar, mas não clicou em adicionar.')
    }

    if(newTag){
      return alert('Você deixou uma "Tag" no campo para adicionar, mas não clicou em adicionar.')
    }

    await api.post("/notes", {
      title,
      description,
      links: links,
      tags: tags,
    });

    alert("Nota criada com sucesso!");
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="Voltar"
              onClick={handleBack}
            />
          </header>

          <Input
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />

          <Textarea 
            placeholder="Observações"
            onChange={e => SetDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onChange={e => setNewLink(e.target.value)}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
                isNew 
                placeholder="Nova tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  );
};