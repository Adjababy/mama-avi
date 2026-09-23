import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const PASSWORD = "mamaavi2026";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [commandes, setCommandes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState("Tous");

  useEffect(() => {
    if (localStorage.getItem("admin_mama_avi") === "true") setIsAuth(true);
  }, []);

  useEffect(() => {
    if (!isAuth) return;
    const q = query(collection(db, "commandes"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id,...d.data() }));
      setCommandes(list);
    });
    return () => unsub();
  }, [isAuth]);

  const getPrix = (produit) => {
    if (!produit) return 3000;
    const p = produit.toLowerCase();
    if (p.includes("prêt") || p.includes("pret") || p.includes("abattu") || p.includes("plum")) return 4000;
    return 3000;
  };

  const cleanPhone = (tel) => {
    if(!tel) return "";
    return tel.replace(/[^0-9]/g, "").replace(/^0/, "223");
  };

  const handleLogin = () => {
    if (password === PASSWORD) {
      localStorage.setItem("admin_mama_avi", "true");
      setIsAuth(true);
    } else alert("Mot de passe incorrect");
  };

  const changeStatut = async (id, nouveauStatut) => {
    await updateDoc(doc(db, "commandes", id), { statut: nouveauStatut });
  };

  const supprimer = async (id) => {
    if(confirm("Supprimer cette commande?")){
      await deleteDoc(doc(db, "commandes", id));
    }
  };

  const filtered = commandes.filter(c => {
    const text = `${c.nom_client || c.nom || ""} ${c.telephone || ""} ${c.poulet || c.produit || ""} ${c.lieu || c.ville || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const statut = c.statut || "nouveau";
    const matchFiltre = filtre === "Tous" || statut === filtre || (filtre === "En attente" && statut === "nouveau");
    return matchSearch && matchFiltre;
  });

  const calcCA = (list) => list.reduce((acc, c) => acc + getPrix(c.poulet || c.produit) * Number(c.quantite || c.qte || 1), 0);
  const caTotal = calcCA(commandes);
  const caFiltre = calcCA(filtered);
  const totalPoulets = filtered.reduce((acc, c) => acc + Number(c.quantite || c.qte || 1), 0);

  const exportExcel = () => {
    let csv = "\ufeffClient,Telephone,Produit,Quantite,PrixU,Total,Lieu,Date,Statut\n";
    filtered.forEach(c => {
      const pu = getPrix(c.poulet || c.produit);
      const qte = Number(c.quantite || c.qte || 1);
      csv += `"${(c.nom_client || c.nom || "").replace(/"/g,'""')}","${c.telephone || ""}","${(c.poulet || c.produit || "").replace(/"/g,'""')}",${qte},${pu},${pu*qte},"${(c.lieu || c.ville || "").replace(/"/g,'""')}","${c.date_souhaitee || ""}","${c.statut || "nouveau"}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `mama_avi_${new Date().toISOString().split('T')[0]}.csv`; a.click();
  };

  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fef9e7" }}>
        <div style={{ background: "white", padding: 30, borderRadius: 12, width: 350, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#173C21", margin:0 }}>Admin Mama Avi</h2>
          <p style={{fontSize:13, color:"#888"}}>Accès sécurisé</p>
          <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=> e.key==='Enter' && handleLogin()} style={{ width: "100%", padding: 12, marginTop: 15, borderRadius: 8, border: "1px solid #ccc", boxSizing:"border-box" }} />
          <button onClick={handleLogin} style={{ width: "100%", marginTop: 15, padding: 12, background: "#173C21", color: "white", border: "none", borderRadius: 8, fontWeight:"bold", cursor:"pointer" }}>Entrer</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fef9e7", padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div><h1 style={{ color: "#173C21", margin: 0 }}>Dashboard Mama Avi</h1><p style={{ margin: "5px 0", fontSize:14 }}>CA Total: <b style={{ color: "#173C21" }}>{caTotal.toLocaleString()} FCFA</b> • {commandes.length} commandes</p></div>
        <div style={{ display: "flex", gap: 10 }}><button onClick={exportExcel} style={{ padding: "10px 20px", background: "#173C21", color: "white", borderRadius: 20, border: "none", fontWeight: "bold", cursor:"pointer" }}>↓ Export Excel</button><button onClick={()=>{localStorage.removeItem("admin_mama_avi"); setIsAuth(false); navigate("/");}} style={{ padding: "10px 20px", background: "white", border: "1px solid #173C21", borderRadius: 20, cursor:"pointer" }}>Sortir</button></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 15, marginTop: 20 }}>
        <div style={{ background: "white", padding: 15, borderRadius: 12 }}><div style={{ fontSize: 12, color: "#888" }}>COMMANDES FILTRÉES</div><div style={{ fontSize: 28, fontWeight: "bold" }}>{filtered.length}</div><div style={{ fontSize: 12 }}>{totalPoulets} poulets</div></div>
        <div style={{ background: "#173C21", color: "white", padding: 15, borderRadius: 12 }}><div style={{ fontSize: 12, opacity: 0.8 }}>CA FILTRÉ</div><div style={{ fontSize: 28, fontWeight: "bold" }}>{caFiltre.toLocaleString()} F</div></div>
        <div style={{ background: "white", padding: 15, borderRadius: 12, display: "flex", gap: 10 }}><input placeholder="🔍 Chercher client, tel, lieu..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #ccc" }} /><select value={filtre} onChange={e=>setFiltre(e.target.value)} style={{ padding: 10, borderRadius: 10 }}><option>Tous</option><option value="nouveau">Nouveau</option><option value="livré">Livré</option><option value="annulé">Annulé</option></select></div>
      </div>

      <div style={{ background: "white", marginTop: 20, borderRadius: 12, overflowX:"auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.8fr", padding: "12px 15px", fontSize: 12, fontWeight: "bold", color: "#666", borderBottom: "1px solid #ddd", minWidth:700 }}><div>Client</div><div>Commande + Prix</div><div>Contact</div><div>Actions</div></div>
        {filtered.map((c,i)=>{
          const pu = getPrix(c.poulet || c.produit); const qte = Number(c.quantite || c.qte || 1);
          const telClean = cleanPhone(c.telephone);
          return (
            <div key={c.id || i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.8fr", padding: "12px 15px", borderBottom: "1px solid #eee", alignItems: "center", minWidth:700 }}>
              <div><div style={{ fontWeight: "bold", color: "#173C21" }}>{c.nom_client || c.nom}</div><div style={{ fontSize: 12, color: "#888" }}>{c.lieu || c.ville} • {c.date_souhaitee || ""}</div></div>
              <div style={{ fontSize: 14 }}><div>{qte}x {c.poulet || c.produit}</div><div style={{ fontSize: 12, color:"#555" }}>{pu.toLocaleString()}F x {qte} = <b>{(pu*qte).toLocaleString()} F</b></div></div>
              <div style={{ display: "flex", gap: 5 }}><a href={`tel:${c.telephone}`} style={{ background: "black", color: "white", padding: "6px 10px", borderRadius: 15, fontSize: 11, textDecoration: "none" }}>Appel</a><a href={`https://wa.me/${telClean}`} target="_blank" style={{ background: "#25D366", color: "white", padding: "6px 10px", borderRadius: 15, fontSize: 11, textDecoration: "none" }}>WA</a></div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
                <span style={{ background: c.statut==="livré"? "#dcfce7" : c.statut==="annulé"? "#fee2e2" : "#fef9c3", padding: "5px 10px", borderRadius: 15, fontSize: 11, fontWeight: "bold" }}>{c.statut || "nouveau"}</span>
                {c.statut!== "livré" && <button onClick={()=>changeStatut(c.id,"livré")} style={{fontSize:11, padding:"5px 8px", borderRadius:10, border:"1px solid #16a34a", background:"white", color:"#16a34a", cursor:"pointer"}}>✓ Livré</button>}
                {c.statut!== "annulé" && <button onClick={()=>changeStatut(c.id,"annulé")} style={{fontSize:11, padding:"5px 8px", borderRadius:10, border:"1px solid #dc2626", background:"white", color:"#dc2626", cursor:"pointer"}}>X</button>}
                <button onClick={()=>supprimer(c.id)} style={{fontSize:11, padding:"5px 8px", borderRadius:10, border:"none", background:"#eee", cursor:"pointer"}}>🗑️</button>
              </div>
            </div>
          )
        })}
        {filtered.length===0 && <div style={{ padding: 30, textAlign: "center", color: "#888" }}>Aucune commande trouvée</div>}
      </div>
    </div>
  );
}