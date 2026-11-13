const products=[
{id:1,name:"Portland Cement",category:"Cement",price:390,unit:"50 kg bag",emoji:"🧱",desc:"Reliable cement for general construction."},
{id:2,name:"River Sand",category:"Aggregates",price:1450,unit:"1 tonne",emoji:"⛰️",desc:"Washed sand for concrete and masonry."},
{id:3,name:"Red Bricks",category:"Masonry",price:9,unit:"per piece",emoji:"🧱",desc:"Standard clay bricks for building work."},
{id:4,name:"TMT Steel Rods",category:"Steel",price:68,unit:"per kg",emoji:"🔩",desc:"Reinforcement steel for structural work."},
{id:5,name:"20mm Gravel",category:"Aggregates",price:1250,unit:"1 tonne",emoji:"🪨",desc:"Crushed aggregate for concrete mixes."},
{id:6,name:"PVC Pipe",category:"Plumbing",price:220,unit:"3 metre",emoji:"〰️",desc:"General-purpose plumbing pipe."},
{id:7,name:"Binding Wire",category:"Steel",price:75,unit:"per kg",emoji:"🧵",desc:"Wire for tying reinforcement bars."},
{id:8,name:"Concrete Blocks",category:"Masonry",price:48,unit:"per piece",emoji:"▦",desc:"Strong blocks for partition and walling."}
];
let cart=JSON.parse(localStorage.getItem("buildmartCart")||"[]"),activeCategory="All";
const $=s=>document.querySelector(s),money=n=>"₹"+Number(n).toLocaleString("en-IN");
function renderProducts(){const term=$("#productSearch").value.toLowerCase();const list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name.toLowerCase().includes(term)||p.category.toLowerCase().includes(term)));$("#productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-visual"><small>${p.category.toUpperCase()}</small>${p.emoji}</div><div class="product-info"><span class="category">${p.category.toUpperCase()}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><div><strong>${money(p.price)}</strong><br><small>${p.unit}</small></div><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name}">+</button></div></div></article>`).join("")||"<p>No materials found. Try another search.</p>";}
function saveCart(){localStorage.setItem("buildmartCart",JSON.stringify(cart));renderCart();}
function renderCart(){let count=cart.reduce((a,x)=>a+x.qty,0),total=cart.reduce((a,x)=>a+x.price*x.qty,0);$("#cartCount").textContent=count;$("#drawerCount").textContent=count;$("#cartTotal").textContent=money(total);$("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div class="cart-emoji">${x.emoji}</div><div><strong>${x.name}</strong><small>${money(x.price)} · ${x.unit}</small></div><div class="qty-controls"><button data-dec="${x.id}">−</button>${x.qty}<button data-inc="${x.id}">+</button></div></div>`).join(""):'<p style="color:#858b81;font-size:12px;padding:20px 0">Your cart is empty. Add a few materials to get started.</p>';}
function openModal(type,name){$("#requestType").value=type;$("#itemName").value=name;$("#modalTitle").textContent=type==="material"?"Checkout your materials":type==="vehicle"?"Request a delivery vehicle":"Equipment rental enquiry";$("#modalSubtitle").textContent=`Request details for ${name}. This is a demo request; no payment or real booking is made.`;$("#quantityWrap").hidden=type!=="material";$("#periodWrap").hidden=type!=="equipment";$("#formMessage").textContent="";$("#modalBackdrop").classList.add("show");}
function closeModal(){$("#modalBackdrop").classList.remove("show")}
$("#productGrid").addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(!b)return;let p=products.find(x=>x.id===+b.dataset.add),item=cart.find(x=>x.id===p.id);item?item.qty++:cart.push({...p,qty:1});saveCart();b.textContent="✓";setTimeout(()=>b.textContent="+",700)});
$("#categoryFilters").addEventListener("click",e=>{let b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#productSearch").addEventListener("input",renderProducts);
$("#cartOpen").onclick=()=>{$("#cartDrawer").classList.add("open");$("#drawerScrim").classList.add("show")};
function closeCart(){$("#cartDrawer").classList.remove("open");$("#drawerScrim").classList.remove("show")}
$("#cartClose").onclick=closeCart;$("#drawerScrim").onclick=closeCart;
$("#cartItems").addEventListener("click",e=>{let inc=e.target.dataset.inc,dec=e.target.dataset.dec;if(!inc&&!dec)return;let id=+(inc||dec),item=cart.find(x=>x.id===id);item.qty+=inc?1:-1;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart()});
$("#checkoutButton").onclick=()=>{if(!cart.length){alert("Your cart is empty.");return}let summary=cart.map(x=>`${x.name} x ${x.qty}`).join(", ");closeCart();openModal("material",summary)};
document.querySelectorAll(".vehicle-request").forEach(b=>b.onclick=()=>openModal("vehicle",b.dataset.vehicle));
document.querySelectorAll(".rental-request").forEach(b=>b.onclick=()=>openModal("equipment",b.dataset.equipment));
$("#modalClose").onclick=closeModal;$("#modalBackdrop").onclick=e=>{if(e.target.id==="modalBackdrop")closeModal()};
$("#requestForm").addEventListener("submit",async e=>{e.preventDefault();let data=Object.fromEntries(new FormData(e.target));data.cart=cart.map(x=>({id:x.id,name:x.name,quantity:x.qty,price:x.price}));try{let res=await fetch("api/submit_request.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});let result=await res.json();if(!res.ok)throw new Error(result.message||"Could not submit");$("#formMessage").textContent=`Request submitted! Demo reference: BM-${result.id}.`;if(data.request_type==="material"){cart=[];saveCart()}e.target.reset()}catch(err){$("#formMessage").textContent="Demo saved locally for preview. To store requests, configure PHP/MySQL using the included README." ;let local=JSON.parse(localStorage.getItem("buildmartRequests")||"[]");local.push({...data,created_at:new Date().toISOString()});localStorage.setItem("buildmartRequests",JSON.stringify(local));}});
$("#menuToggle").onclick=()=>$("#mainNav").classList.toggle("open");
document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"));
renderProducts();renderCart();
