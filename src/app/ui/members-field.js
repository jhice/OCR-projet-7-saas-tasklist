"use client";

import { getNameInitials } from "@/services/helpers";
import { useState, useTransition } from "react";

/**
 * Liste de membres (avec lien de retrait) + ajout par e-mail.
 * Ne gère pas la liste elle-même : c'est le parent qui décide
 * (liste locale envoyée au submit, ou appel API immédiat).
 *
 * @param {object[]} members    [{ id, name, email }]
 * @param {Function} onAdd      async (email) => message d'erreur | undefined
 * @param {Function} onRemove   async (member) => message d'erreur | undefined
 * @param {Function} [canRemove] (member) => false pour masquer le lien (ex. propriétaire)
 * @param {string} [hiddenName] si fourni, un <input hidden> par membre pour le formData
 * @param {string} [hiddenKey]  propriété du membre utilisée comme valeur ("id" ou "email")
 * @param {string[]} [error]    erreurs zod renvoyées par l'action du formulaire parent
 */
export default function MembersField({ id, label, members, onAdd, onRemove, canRemove = () => true, hiddenName, hiddenKey = "id", error }) {

  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState();
  const [pending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(async () => {
      const addError = await onAdd(email.trim());
      setLocalError(addError);
      if (!addError) {
        setEmail("");
      }
    });
  }

  function handleRemove(member) {
    startTransition(async () => {
      setLocalError(await onRemove(member));
    });
  }

  function handleKeyDown(e) {
    // Entrée ajoute le membre au lieu de soumettre le formulaire parent
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div>
      <label htmlFor={id} className="auth-label">{label}</label>

      {members.length > 0 && (
        <ul className="mt-2 flex flex-col gap-2">
          {members.map(member =>
            <li key={member.id} className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center">
                <span className="avatar-sm">{getNameInitials(member.name)}</span>
                <span className="name-pill">{member.name}</span>
                <span className="ml-2 text-xs text-gray-500">{member.email}</span>
              </span>
              {canRemove(member) && (
                <button type="button" className="auth-link text-sm text-red-600" disabled={pending} onClick={() => handleRemove(member)}>Retirer</button>
              )}
              {hiddenName && <input type="hidden" name={hiddenName} value={member[hiddenKey]} />}
            </li>
          )}
        </ul>
      )}

      <div className="mt-2 flex gap-2">
        {/* type text (et pas email) : une saisie en cours ne doit pas bloquer le submit du formulaire parent */}
        <input id={id} type="text" inputMode="email" autoComplete="off" placeholder="E-mail du membre" className="auth-input flex-1"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="btn-dark" disabled={pending || !email.trim()} onClick={handleAdd}>Ajouter</button>
      </div>

      {localError && <p className="text-[#CC3300] mt-2 ml-2 text-sm">{localError}</p>}
      {error && <p className="text-[#CC3300] mt-2 ml-2 text-sm">{error}</p>}
    </div>
  )
}
