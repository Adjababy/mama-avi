import { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

// MODIFIE TES PRIX ICI EN FCFA
const PRIX = {
  "Poulet pret à cuire": 3500,
  "Poulet vivant": 3000,
  
};

export default function Admin() {
  const [commandes, setCommandes] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPoulet, setFilterPoulet] = useState("tous");
  const ADMIN_PASS = "mamaavi2026";

  useEffect(() => {
    if (!isAuth) return;
    const q = query(collection(db, "commandes"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setCommandes(snap.docs.map(d => ({ id: d.id, status: "en_attente",...d.data() })));
    });
    return () => unsub();
  }, [isAuth]);

  const filtered = useMemo(() => {
    return commandes.filter(c => `${c.nom_client} ${c.telephone} ${c.lieu}`.toLowerCase().includes(search.toLowerCase()) && (filterPoulet === "tous" || c.poulet === filterPoulet));
  }, [commandes, search, filterPoulet]);

  const stats = {
    total: commandes.length,
    poulets: commandes.reduce((s,c)=> s+(c.quantite||0),0),
    ca: commandes.reduce((s,c)=> s + (c.quantite||0)*(PRIX[c.poulet]||0),0),
    caFiltre: filtered.reduce((s,c)=> s + (c.quantite||0)*(PRIX[c.poulet]||0),0),
  };

  const exportExcel = () => {
    const headers = ["Date","Nom","Telephone","Lieu","Poulet","Quantite","Prix_U","Total","Statut","Notes"];
    const rows = filtered.map(c => {
      const prixU = PRIX[c.poulet] || 0;
      return [
        c.date?.seconds? new Date(c.date.seconds*1000).toLocaleString('fr-FR') : "",
        `"${(c.nom_client||'').replace(/"/g,'""')}"`,
        c.telephone,
        `"${(c.lieu||'').replace(/"/g,'""')}"`,
        c.poulet,
        c.quantite,
        prixU,
        prixU * (c.quantite||0),
        c.status||"en_attente",
        `"${(c.notes||'').replace(/"/g,'""')}"`,
      ].join(",");
    });
    const csv = [headers.join(","),...rows].join("\n");
    const blob = new Blob(["\ufeff"+csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mama-avi-commandes-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#F8F3E7] flex items-center justify-center p-6">
        <div className="bg-white rounded-[2rem] shadow-xl p-10 max-w-sm w-full text-center">
          <h1 className="text-2xl font-extrabold text-[#173C21]">Admin Mama Avi</h1>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=> e.key==="Enter" && (password===ADMIN_PASS? setIsAuth(true): alert("Mauvais code"))} placeholder="Mot de passe" className="w-full px-4 py-3 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] mt-6 mb-4 outline-none"/>
          <button onClick={()=> password===ADMIN_PASS? setIsAuth(true): alert("Mauvais code")} className="w-full bg-[#173C21] text-white font-bold py-3 rounded-xl">Entrer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3E7] p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#173C21]">Dashboard Mama Avi</h1>
            <p className="text-[#6B6255] text-sm">Chiffre d'affaires total: <b className="text-[#173C21]">{stats.ca.toLocaleString()} FCFA</b></p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportExcel} className="bg-[#173C21] text-white text-sm font-bold px-5 py-2.5 rounded-full">⬇ Export Excel</button>
            <button onClick={()=>setIsAuth(false)} className="bg-white text-sm px-4 py-2.5 rounded-full border">Sortir</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm"><p className="text-xs text-[#6B6255]">COMMANDES FILTRÉES</p><p className="text-2xl font-bold">{filtered.length}</p><p className="text-xs">{stats.poulets} poulets</p></div>
          <div className="bg-[#173C21] text-white rounded-2xl p-4 shadow-sm"><p className="text-xs opacity-70">CA FILTRÉ</p><p className="text-xl font-bold">{stats.caFiltre.toLocaleString()} F</p></div>
          <div className="bg-white rounded-2xl p-4 shadow-sm col-span-2 flex gap-2">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Chercher..." className="flex-1 px-4 py-2 rounded-xl border bg-[#FCFAF5] outline-none text-sm"/>
            <select value={filterPoulet} onChange={e=>setFilterPoulet(e.target.value)} className="px-3 py-2 rounded-xl border bg-white text-sm">
              <option value="tous">Tous</option>
              {Object.keys(PRIX).map(k=> <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#FCFAF5] text-[11px] text-[#6B6255]"><tr><th className="p-3 text-left">Client</th><th className="p-3 text-left">Commande + Prix</th><th className="p-3 text-left">Contact</th><th className="p-3 text-left">Statut</th></tr></thead>
              <tbody>
                {filtered.map(c=>{
                  const prixU = PRIX[c.poulet]||0;
                  const total = prixU * (c.quantite||0);
                  return (
                    <tr key={c.id} className="border-t">
                      <td className="p-3"><b className="text-[#173C21]">{c.nom_client}</b><br/><span className="text-xs text-[#6B6255]">{c.lieu} • {c.date?.seconds? new Date(c.date.seconds*1000).toLocaleDateString() : ""}</span></td>
                      <td className="p-3">{c.quantite}x {c.poulet}<br/><span className="text-xs">{prixU.toLocaleString()}F x {c.quantite} = <b className="text-[#173C21]">{total.toLocaleString()} F</b></span></td>
                      <td className="p-3 flex gap-1 mt-2">
                        <a href={`tel:${c.telephone}`} className="bg-black text-white text-[11px] px-2.5 py-1 rounded-full">Appel</a>
                        <a href={`https://wa.me/${c.telephone?.replace(/[^0-9]/g,'')}`} target="_blank" className="bg-[#25D366] text-white text-[11px] px-2.5 py-1 rounded-full">WA</a>
                      </td>
                      <td className="p-3">
                        <button onClick={()=> updateDoc(doc(db,"commandes",c.id), {status: c.status==="livre"?"en_attente":"livre"})} className={`text-[11px] px-3 py-1 rounded-full font-bold ${c.status==="livre"?"bg-green-600 text-white":"bg-yellow-100"}`}>{c.status==="livre"?"LIVRÉ ✓":"En attente"}</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}