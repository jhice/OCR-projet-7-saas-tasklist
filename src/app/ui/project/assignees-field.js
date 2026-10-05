"use client";

import { getProjectMembers } from "@/services/helpers";
import { useState } from "react";
import MembersField from "../members-field";

/**
 * Assignés d'une tâche : liste locale, envoyée en assigneeIds au submit.
 * L'API n'accepte que des membres du projet : l'e-mail saisi est cherché parmi eux.
 */
export default function AssigneesField({ id, project, initialAssignees = [], error }) {

  const [assignees, setAssignees] = useState(initialAssignees);

  function addAssignee(email) {
    const member = getProjectMembers(project).find(user => user.email.toLowerCase() === email.toLowerCase());
    if (!member) {
      return "Cette personne n'est pas membre du projet.";
    }
    if (assignees.some(assignee => assignee.id === member.id)) {
      return "Cette personne est déjà assignée.";
    }
    setAssignees([...assignees, member]);
  }

  return (
    <MembersField id={id} label="Assigné à" listLabel="Personnes assignées"
      members={assignees}
      onAdd={addAssignee}
      onRemove={member => setAssignees(assignees.filter(assignee => assignee.id !== member.id))}
      hiddenName="assigneeIds"
      hiddenKey="id"
      error={error}
    />
  );
}
