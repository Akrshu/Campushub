import { useMemo, useState } from "react";
import {
  Bell,
  Bookmark,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Heart,
  ImagePlus,
  Laptop,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Section = "Home" | "Explore" | "Messages" | "Notifications" | "Marketplace" | "Notes & Resources" | "Events & Hackathons" | "My Profile" | "Settings";

const students = [
  { name: "Arshiya Sharma", major: "Computer Science", initials: "AS", color: "bg-[#e5dcff] text-[#6949c6]", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" },
  { name: "Prashant Singh", major: "Product Design", initials: "PS", color: "bg-[#ffe2d2] text-[#be6849]", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" },
  { name: "Sawan Yadav", major: "Economics", initials: "SY", color: "bg-[#d8f1e5] text-[#3e8a69]", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80" },
  { name: "Gaurav", major: "Engineering", initials: "GA", color: "bg-[#dce9ff] text-[#4775bb]", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&q=80" },
];

const initialPosts = [
  {
    id: 1,
    name: "Arshiya Sharma",
    initials: "AS",
    major: "Computer Science · Class of '26",
    time: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80",
    text: "Spent the afternoon building something a little different. So grateful for the people who make campus feel like home 💜",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    likes: 48,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    name: "Prashant Singh",
    initials: "PS",
    major: "Product Design · Class of '25",
    time: "5 hours ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
    text: "Design club is hosting a portfolio review this Thursday! Bring whatever you're working on — polished or not. Everyone's welcome.",
    image: "",
    likes: 31,
    comments: 8,
    liked: false,
  },
];

const products = [
  { id: 1, title: "MacBook Air M2 · 13-inch", price: 720, category: "Electronics", condition: "Like new", seller: "Arshiya Sharma", location: "North Campus", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80", initials: "AS", color: "bg-[#e5dcff] text-[#6949c6]" },
  { id: 2, title: "Calculus: Early Transcendentals", price: 38, category: "Books", condition: "Good", seller: "Prashant Singh", location: "Library pickup", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80", initials: "PS", color: "bg-[#ffe2d2] text-[#be6849]" },
  { id: 3, title: "Desk lamp with wireless charger", price: 24, category: "Furniture", condition: "Good", seller: "Sawan Yadav", location: "East Hall", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80", initials: "SY", color: "bg-[#d8f1e5] text-[#3e8a69]" },
  { id: 4, title: "Sony WH-1000XM4 headphones", price: 145, category: "Electronics", condition: "Like new", seller: "Gaurav", location: "Student Center", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80", initials: "GA", color: "bg-[#dce9ff] text-[#4775bb]" },
];

const navGroups = [
  { label: "CAMPUS", items: [{ label: "Home", icon: Compass }, { label: "Explore", icon: Sparkles }, { label: "Messages", icon: MessageSquare, badge: "3" }, { label: "Notifications", icon: Bell, badge: "2" }] },
  { label: "COMMUNITY", items: [{ label: "Marketplace", icon: ShoppingBag }, { label: "Notes & Resources", icon: BookOpen }, { label: "Events & Hackathons", icon: CalendarDays }] },
];

function Avatar({ name, image, initials, className = "" }: { name: string; image?: string; initials?: string; className?: string }) {
  return image ? <img src={image} alt={name} className={`h-10 w-10 rounded-full object-cover ${className}`} /> : <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eafe] text-xs font-bold text-[#5262ca] ${className}`}>{initials || name.slice(0, 2).toUpperCase()}</span>;
}

export default function Index() {
  const [section, setSection] = useState<Section>("Home");
  const [posts, setPosts] = useState(initialPosts);
  const [saved, setSaved] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All items");
  const [sort, setSort] = useState("Recommended");
  const [draft, setDraft] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");

  const filteredProducts = useMemo(() => {
    const results = products.filter((product) => (category === "All items" || product.category === category) && `${product.title} ${product.category} ${product.seller}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "Price: low to high") return [...results].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") return [...results].sort((a, b) => b.price - a.price);
    return results;
  }, [category, query, sort]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const toggleLike = (id: number) => setPosts((current) => current.map((post) => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post));
  const toggleSave = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const createPost = () => {
    if (!draft.trim()) return;
    setPosts((current) => [{ id: Date.now(), name: "Arshiya Sharma", initials: "AS", major: "Information Systems · Class of '26", time: "Just now", avatar: "", text: draft.trim(), image: "", likes: 0, comments: 0, liked: false }, ...current]);
    setDraft("");
    setShowComposer(false);
    notify("Your post is live on campus.");
  };

  const goTo = (label: string) => {
    setSection(label as Section);
    setMobileNav(false);
    setQuery("");
  };

  return (
    <div className="campus-app min-h-screen bg-[#f6f7fb] text-[#20243a]">
      <header className="app-header sticky top-0 z-30 flex h-[76px] items-center border-b border-[#e9eaf1] bg-white/95 px-5 backdrop-blur-xl lg:px-8">
        <button className="mr-3 rounded-xl p-2 text-[#68708a] hover:bg-[#f4f5fa] lg:hidden" aria-label="Open menu" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={20} /> : <Menu size={20} />}</button>
        <button onClick={() => goTo("Home")} className="flex w-[230px] shrink-0 items-center gap-3 text-left">
          <span className="brand-mark flex h-10 w-10 items-center justify-center rounded-[14px] text-white"><span className="text-lg font-black">c</span></span>
          <span><span className="block text-[17px] font-extrabold tracking-[-.6px] text-[#20243a]">campus<span className="text-[#6873e8]">hub</span></span><span className="-mt-0.5 block text-[8px] font-semibold tracking-[.2px] text-[#9a9fb1]">One Platform. Every Campus Need.</span></span>
        </button>
        <div className="hidden max-w-[550px] flex-1 md:block">
          <label className="search-box flex h-11 items-center gap-3 rounded-[13px] border border-[#eceef4] bg-[#f8f9fc] px-4 transition focus-within:border-[#bbc0fa] focus-within:bg-white">
            <Search size={17} className="text-[#959bb0]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={section === "Marketplace" ? "Search items, books, electronics..." : "Search people, posts, events..."} className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#a3a8b8]" />
            <kbd className="hidden rounded-md border border-[#e6e8ef] bg-white px-1.5 py-0.5 text-[10px] text-[#a1a6b6] lg:inline">⌘ K</kbd>
          </label>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Button onClick={() => section === "Marketplace" ? setShowSellForm(true) : setShowComposer(true)} className="h-10 gap-2 rounded-xl bg-[#626fe0] px-4 text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(98,111,224,.2)] hover:bg-[#5360d0]"><Plus size={17} /> <span className="hidden sm:inline">{section === "Marketplace" ? "Sell an item" : "Create post"}</span></Button>
          <button className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-[#72788e] hover:bg-[#f5f6fa] sm:flex" onClick={() => goTo("Notifications")} aria-label="Notifications"><Bell size={19} /><i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ee7e80] ring-2 ring-white" /></button>
          <button className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-[#72788e] hover:bg-[#f5f6fa] sm:flex" onClick={() => goTo("Messages")} aria-label="Messages"><MessageCircle size={19} /><i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#6873e8] ring-2 ring-white" /></button>
          <button onClick={() => goTo("My Profile")} className="ml-1 flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-[#f6f7fb]"><Avatar name="Arshiya Sharma" initials="AS" className="h-9 w-9" /><ChevronDown size={14} className="hidden text-[#8d93a7] sm:block" /></button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className={`sidebar fixed inset-y-[76px] left-0 z-20 w-[250px] border-r border-[#e9eaf1] bg-white px-4 pb-6 pt-7 transition-transform lg:sticky lg:top-[76px] lg:block lg:h-[calc(100vh-76px)] lg:translate-x-0 ${mobileNav ? "translate-x-0 shadow-xl" : "-translate-x-full"}`}>
          <div className="mb-7 rounded-2xl bg-[#f6f7ff] p-4">
            <div className="mb-2 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#62bd91]" /><span className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#9298b0]">Your campus</span></div>
            <div className="flex items-center justify-between"><div><p className="text-[13px] font-bold">Chandigarh University</p><p className="mt-0.5 text-[11px] text-[#9298ad]">Chandigarh, India</p></div><ChevronDown size={15} className="text-[#8e94aa]" /></div>
          </div>
          {navGroups.map((group) => <div key={group.label} className="mb-7"><p className="mb-2 px-3 text-[10px] font-bold tracking-[1.5px] text-[#a3a8b8]">{group.label}</p><nav className="space-y-1">{group.items.map(({ label, icon: Icon, badge }) => <button key={label} onClick={() => goTo(label)} className={`nav-item flex w-full items-center gap-3 rounded-xl px-3 py-[10px] text-left text-[13px] font-medium transition ${section === label ? "bg-[#f0f1ff] text-[#5e69d6]" : "text-[#6f758a] hover:bg-[#f7f8fb] hover:text-[#34394e]"}`}><Icon size={18} strokeWidth={1.8} /><span className="flex-1">{label}</span>{badge && <span className={`min-w-5 rounded-md px-1.5 py-0.5 text-center text-[10px] font-bold ${section === label ? "bg-[#dfe2ff] text-[#5e69d6]" : "bg-[#f0f1f7] text-[#8d93a8]"}`}>{badge}</span>}</button>)}</nav></div>)}
          <div className="mb-6"><p className="mb-2 px-3 text-[10px] font-bold tracking-[1.5px] text-[#a3a8b8]">PERSONAL</p><nav className="space-y-1"><button onClick={() => goTo("My Profile")} className={`nav-item flex w-full items-center gap-3 rounded-xl px-3 py-[10px] text-left text-[13px] font-medium transition ${section === "My Profile" ? "bg-[#f0f1ff] text-[#5e69d6]" : "text-[#6f758a] hover:bg-[#f7f8fb]"}`}><Users size={18} strokeWidth={1.8} /><span>My Profile</span></button><button onClick={() => goTo("Settings")} className={`nav-item flex w-full items-center gap-3 rounded-xl px-3 py-[10px] text-left text-[13px] font-medium transition ${section === "Settings" ? "bg-[#f0f1ff] text-[#5e69d6]" : "text-[#6f758a] hover:bg-[#f7f8fb]"}`}><Settings2 size={18} strokeWidth={1.8} /><span>Settings</span></button></nav></div>
          <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#eef0ff] to-[#f8f2ff] p-4"><div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#6873e8] shadow-sm"><Zap size={16} fill="currentColor" /></div><p className="text-[12px] font-bold">Good things happen here.</p><p className="mt-1 text-[11px] leading-relaxed text-[#858ba2]">Your campus community is growing. Invite a friend to join.</p><button onClick={() => notify("Invite link copied to clipboard.")} className="mt-3 text-[11px] font-bold text-[#626fe0]">Invite a friend <span aria-hidden="true">→</span></button></div>
          <p className="mt-5 px-2 text-[10px] text-[#b0b4c1]">© 2025 Campus Hub · Made for students</p>
        </aside>
        {mobileNav && <button aria-label="Close menu" onClick={() => setMobileNav(false)} className="fixed inset-0 z-10 bg-[#20243a]/20 lg:hidden" />}

        <main className="min-w-0 flex-1 px-4 pb-12 pt-7 sm:px-7 lg:px-10">
          {section === "Home" || section === "Explore" ? <div className="mx-auto grid max-w-[1110px] grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_290px]">
            <section className="min-w-0">
              <div className="mb-6 flex items-end justify-between"><div><div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#9197aa]"><span>MONDAY, OCTOBER 21</span><span className="h-1 w-1 rounded-full bg-[#bdc1cd]"/><span className="flex items-center gap-1"><MapPin size={12}/> Chandigarh, India</span></div><h1 className="text-[27px] font-extrabold tracking-[-1px] text-[#252940]">Good morning, Arshiya Sharma <span className="inline-block origin-bottom-right animate-[wave_2s_ease-in-out_infinite]">✦</span></h1><p className="mt-1 text-[13px] text-[#9298aa]">Here's what's happening around campus today.</p></div><button onClick={() => setSection("Explore")} className="hidden items-center gap-1 text-[12px] font-semibold text-[#6973d8] sm:flex">Explore campus <ChevronRight size={15}/></button></div>

              <div className="mb-6 rounded-[18px] border border-[#eceef4] bg-white p-5 shadow-[0_3px_14px_rgba(31,38,78,.025)]"><div className="mb-4 flex items-center gap-3"><Avatar name="Arshiya Sharma" initials="AS"/><button onClick={() => setShowComposer(true)} className="h-11 flex-1 rounded-xl bg-[#f7f8fb] px-4 text-left text-[13px] text-[#a1a6b5] transition hover:bg-[#f2f3f9]">Share something with your campus...</button></div><div className="flex items-center justify-between border-t border-[#f0f1f5] pt-3"><button onClick={() => setShowComposer(true)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-[#788097] hover:bg-[#f7f8fb]"><ImagePlus size={16} className="text-[#64ad91]"/> Photo</button><button onClick={() => notify("Event sharing will be available soon.")} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-[#788097] hover:bg-[#f7f8fb]"><CalendarDays size={15} className="text-[#e0a65e]"/> Event</button><button onClick={() => setShowComposer(true)} className="rounded-lg bg-[#626fe0] px-4 py-2 text-[11px] font-bold text-white transition hover:bg-[#535fcf]">Post</button></div></div>

              <div className="mb-6 flex items-center justify-between"><div><h2 className="text-[15px] font-bold">Your campus, lately</h2><p className="mt-0.5 text-[11px] text-[#a1a6b5]">The conversations happening around you</p></div><button className="flex items-center gap-1.5 text-[11px] font-semibold text-[#777e93]" onClick={() => notify("Showing the latest campus stories.")}><span className="h-1.5 w-1.5 rounded-full bg-[#68bf97]"/> Live <ChevronDown size={13}/></button></div>
              <div className="mb-7 flex gap-4 overflow-x-auto pb-2">{students.map((student, index) => <button key={student.name} onClick={() => notify(`${student.name}'s story is coming up next.`)} className="group flex w-[66px] shrink-0 flex-col items-center gap-2"><span className={`story-ring relative rounded-full p-[2px] ${index === 0 ? "bg-[#7882ed]" : "bg-[#dfe2f4]"}`}><Avatar name={student.name} image={student.image} initials={student.initials} className="h-[54px] w-[54px] border-[2px] border-white" />{index === 0 && <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#6873e8] text-[12px] font-bold text-white">+</span>}</span><span className="w-full truncate text-center text-[10px] font-medium text-[#6f758b] group-hover:text-[#535fcf]">{student.name}</span></button>)}</div>

              <div className="mb-5 flex items-center justify-between"><h2 className="text-[15px] font-bold">Campus feed <span className="ml-1 rounded-md bg-[#eef0ff] px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#6c76df]">For you</span></h2><button className="rounded-lg p-2 text-[#9399aa] hover:bg-white" onClick={() => notify("Feed preferences are up to date.")} aria-label="Feed settings"><SlidersHorizontal size={16}/></button></div>
              <div className="space-y-5">{posts.map((post) => <article key={post.id} className="overflow-hidden rounded-[18px] border border-[#eceef4] bg-white shadow-[0_3px_14px_rgba(31,38,78,.025)]"><div className="flex items-center gap-3 px-5 pb-3 pt-5"><Avatar name={post.name} image={post.avatar || undefined} initials={post.initials}/><div className="min-w-0 flex-1"><p className="text-[12px] font-bold">{post.name}<span className="ml-2 inline-block h-1 w-1 rounded-full bg-[#c4c7d2]"/><span className="ml-2 font-normal text-[#9ca1b1]">{post.time}</span></p><p className="mt-0.5 text-[10px] text-[#9ca1b1]">{post.major}</p></div><button onClick={() => notify("Post options opened.")} className="rounded-lg p-2 text-[#999eaf] hover:bg-[#f7f8fb]" aria-label="More options"><MoreHorizontal size={19}/></button></div><p className="px-5 pb-4 text-[13px] leading-[1.75] text-[#50566b]">{post.text}</p>{post.image && <img src={post.image} alt="Students enjoying time together on campus" className="max-h-[390px] w-full object-cover"/>}<div className="flex items-center justify-between px-5 py-3 text-[10px] text-[#999eaf]"><span className="flex items-center gap-1.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fff0f0] text-[#ed777e]"><Heart size={11} fill="currentColor"/></span>{post.likes} students</span><button onClick={() => notify("Comments are ready for this post.")}>{post.comments} comments</button></div><div className="mx-5 border-t border-[#f0f1f5]"/><div className="flex items-center justify-around px-2 py-1.5"><button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-semibold transition hover:bg-[#f8f8fb] ${post.liked ? "text-[#e87582]" : "text-[#82889a]"}`}><Heart size={16} fill={post.liked ? "currentColor" : "none"}/>{post.liked ? "Liked" : "Like"}</button><button onClick={() => notify("Comments are ready for this post.")} className="flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-semibold text-[#82889a] hover:bg-[#f8f8fb]"><MessageCircle size={16}/>Comment</button><button onClick={() => notify("Post link copied.")} className="flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-semibold text-[#82889a] hover:bg-[#f8f8fb]"><Share2 size={15}/>Share</button><button onClick={() => toggleSave(post.id)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold hover:bg-[#f8f8fb] ${saved.includes(post.id) ? "text-[#6873e8]" : "text-[#82889a]"}`} aria-label="Save post"><Bookmark size={15} fill={saved.includes(post.id) ? "currentColor" : "none"}/></button></div></article>)}</div>
              <button onClick={() => notify("You're all caught up with your campus feed.")} className="mt-5 w-full rounded-xl border border-dashed border-[#dfe1eb] py-3 text-[11px] font-semibold text-[#8d93a6] hover:bg-white">You're all caught up · Refresh feed</button>
            </section>

            <aside className="hidden space-y-5 xl:block">
              <div className="overflow-hidden rounded-[18px] border border-[#eceef4] bg-white shadow-[0_3px_14px_rgba(31,38,78,.025)]"><div className="flex items-center justify-between px-5 pb-3 pt-5"><div><h3 className="text-[13px] font-bold">Trending on campus</h3><p className="mt-0.5 text-[10px] text-[#a0a5b5]">The buzz around Chandigarh University</p></div><Sparkles size={16} className="text-[#a9aff0]"/></div><div className="space-y-0.5 px-3 pb-3">{[{ tag: "#wildhacks2025", detail: "Hackathon · 148 posts" }, { tag: "#midtermseason", detail: "Academics · 96 posts" }, { tag: "#campusconcert", detail: "Events · 62 posts" }].map((trend, i) => <button key={trend.tag} className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left hover:bg-[#f8f8fc]" onClick={() => { setQuery(trend.tag.replace("#", "")); notify(`Showing posts for ${trend.tag}`); }}><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f1ff] text-[10px] font-bold text-[#737de0]">0{i + 1}</span><span><span className="block text-[11px] font-bold text-[#4b5167]">{trend.tag}</span><span className="mt-0.5 block text-[10px] text-[#a1a6b4]">{trend.detail}</span></span></button>)}</div><button onClick={() => goTo("Explore")} className="mx-5 mb-4 mt-1 text-[10px] font-bold text-[#6873e8]">See what's trending →</button></div>
              <div className="rounded-[18px] border border-[#eceef4] bg-white p-5 shadow-[0_3px_14px_rgba(31,38,78,.025)]"><div className="mb-4 flex items-start justify-between"><div><h3 className="text-[13px] font-bold">People you may know</h3><p className="mt-0.5 text-[10px] text-[#a0a5b5]">Make your campus feel smaller</p></div><Users size={16} className="text-[#a9aff0]"/></div><div className="space-y-4">{students.slice(1, 4).map((student) => <div key={student.name} className="flex items-center gap-2.5"><Avatar name={student.name} image={student.image} initials={student.initials} className="h-9 w-9"/><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{student.name}</p><p className="truncate text-[9px] text-[#a0a5b5]">{student.major}</p></div><button onClick={(event) => { event.currentTarget.innerHTML = "✓"; event.currentTarget.classList.add("is-following"); notify(`You're now following ${student.name}.`); }} className="follow-button h-7 w-7 rounded-lg border border-[#e7e8f1] text-[15px] font-medium text-[#6e78db] transition hover:border-[#6e78db] hover:bg-[#f3f4ff]" aria-label={`Follow ${student.name}`}>+</button></div>)}</div><button onClick={() => goTo("Explore")} className="mt-4 text-[10px] font-bold text-[#6873e8]">Find more students →</button></div>
              <div className="relative overflow-hidden rounded-[18px] bg-[#252a48] p-5 text-white"><div className="absolute -right-6 -top-8 h-28 w-28 rounded-full border-[18px] border-[#ffffff0c]"/><div className="relative"><span className="rounded-md bg-[#ffffff19] px-2 py-1 text-[9px] font-bold uppercase tracking-[1px] text-[#c4c9ff]">Coming up</span><h3 className="mt-3 text-[14px] font-bold">WildHacks 2025</h3><p className="mt-1 text-[10px] text-[#c3c7d7]">48 hours. Big ideas. Your campus.</p><div className="mt-4 flex items-center justify-between"><span className="flex items-center gap-1.5 text-[10px] text-[#c3c7d7]"><CalendarDays size={13}/> Nov 8–10 · Tech Institute</span><button onClick={() => goTo("Events & Hackathons")} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#303652] hover:bg-[#eff0ff]"><ChevronRight size={15}/></button></div></div></div>
              <div className="flex flex-wrap gap-x-3 gap-y-2 px-2 text-[9px] text-[#a8acb9]"><button onClick={() => goTo("Settings")}>About</button><button onClick={() => goTo("Settings")}>Guidelines</button><button onClick={() => goTo("Settings")}>Privacy</button><button onClick={() => goTo("Settings")}>Help</button><span>© 2025 Campus Hub</span></div>
            </aside>
          </div> : section === "Marketplace" ? <div className="mx-auto max-w-[1110px]"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 text-[11px] font-semibold text-[#9298aa]">CAMPUS COMMUNITY <span className="mx-1 text-[#c8cad4]">/</span> MARKETPLACE</div><h1 className="text-[27px] font-extrabold tracking-[-1px]">Good finds, close by.</h1><p className="mt-1 text-[13px] text-[#9298aa]">Buy and sell with students on your campus.</p></div><Button onClick={() => setShowSellForm(true)} className="h-10 gap-2 self-start rounded-xl bg-[#626fe0] px-4 text-[12px] font-semibold text-white hover:bg-[#535fcf] sm:self-auto"><Plus size={16}/> Sell an item</Button></div><div className="mb-6 flex flex-wrap gap-2">{["All items", "Electronics", "Books", "Furniture", "Clothing", "Accessories", "Sports Equipment", "Other"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${category === item ? "bg-[#626fe0] text-white shadow-[0_3px_10px_rgba(98,111,224,.2)]" : "border border-[#e9eaf1] bg-white text-[#72788e] hover:border-[#c9cdf0] hover:text-[#5965d1]"}`}>{item}</button>)}</div><div className="mb-5 flex items-center justify-between"><p className="text-[12px] text-[#9298aa]"><span className="font-bold text-[#454b61]">{filteredProducts.length} items</span> near Northwestern</p><label className="flex items-center gap-2 rounded-lg border border-[#e9eaf1] bg-white px-3 py-2 text-[11px] text-[#72788e]"><Settings2 size={14}/><select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent outline-none"><option>Recommended</option><option>Price: low to high</option><option>Price: high to low</option><option>Newest</option></select></label></div>{filteredProducts.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">{filteredProducts.map((product) => <article key={product.id} className="group overflow-hidden rounded-[18px] border border-[#eceef4] bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(35,42,86,.09)]"><div className="relative h-[190px] overflow-hidden bg-[#f0f1f5]"><img src={product.image} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"/><span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-[9px] font-bold text-[#555b71] backdrop-blur">{product.condition}</span><button onClick={() => notify("Item saved to your wishlist.")} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#72788e] backdrop-blur hover:text-[#e87582]" aria-label="Save to wishlist"><Heart size={15}/></button></div><div className="p-4"><div className="mb-1 flex items-start justify-between gap-2"><h3 className="line-clamp-2 min-h-[38px] text-[13px] font-bold leading-[1.45]">{product.title}</h3></div><p className="text-[19px] font-extrabold tracking-[-.5px] text-[#303650]">${product.price}<span className="ml-1 text-[10px] font-medium text-[#9da2b1]">USD</span></p><div className="mt-3 flex items-center justify-between border-t border-[#f0f1f5] pt-3"><div className="flex min-w-0 items-center gap-2"><Avatar name={product.seller} initials={product.initials} className={`h-7 w-7 ${product.color}`}/><div className="min-w-0"><p className="truncate text-[10px] font-semibold">{product.seller}</p><p className="text-[9px] text-[#a0a5b5]">{product.location}</p></div></div><button onClick={() => notify("Contact seller is a demo interaction.")} className="rounded-lg border border-[#e7e8f1] px-2.5 py-1.5 text-[10px] font-bold text-[#636ed7] hover:bg-[#f3f4ff]">Contact</button></div></div></article>)}</div> : <div className="rounded-2xl border border-dashed border-[#dfe1eb] bg-white py-16 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f1ff] text-[#6873e8]"><Search size={20}/></div><h3 className="mt-4 text-[14px] font-bold">No items found</h3><p className="mt-1 text-[12px] text-[#9298aa]">Try another search or category.</p><button onClick={() => { setQuery(""); setCategory("All items"); }} className="mt-4 text-[11px] font-bold text-[#6873e8]">Clear filters</button></div>}<div className="mt-7 rounded-2xl border border-[#e8e9fa] bg-[#f0f1ff] p-4 text-[11px] leading-relaxed text-[#737991]"><span className="font-bold text-[#505bcb]">Campus-safe buying:</span> Meet in a public campus spot and verify the item before you pay. Payments shown in this preview are UI prototypes only; no real payment processing is enabled.</div></div> : <div className="mx-auto max-w-[760px]"><button onClick={() => goTo("Home")} className="mb-5 text-[11px] font-bold text-[#6873e8]">← Back to your feed</button><div className="rounded-[22px] border border-[#eceef4] bg-white px-6 py-14 text-center shadow-[0_3px_14px_rgba(31,38,78,.025)] sm:px-12"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f1ff] text-[#6873e8]"><Sparkles size={23}/></div><p className="mt-5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#9ba1b3]">Campus Hub · {section}</p><h1 className="mt-2 text-[24px] font-extrabold tracking-[-.8px]">Your campus, one step closer.</h1><p className="mx-auto mt-3 max-w-[440px] text-[13px] leading-relaxed text-[#858ba0]">This space is ready to grow. We’re building a thoughtful {section.toLowerCase()} experience for your campus community.</p><Button onClick={() => goTo("Home")} className="mt-6 h-10 rounded-xl bg-[#626fe0] px-5 text-[12px] font-semibold text-white hover:bg-[#535fcf]">Back to home feed</Button></div></div>}
        </main>
      </div>

      {showComposer && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20243a]/35 p-4 backdrop-blur-[2px]" onClick={() => setShowComposer(false)}><div className="w-full max-w-[520px] rounded-[20px] bg-white p-5 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><div><h2 className="text-[17px] font-bold">Create a post</h2><p className="mt-1 text-[11px] text-[#9a9fb0]">Share something with your campus community.</p></div><button onClick={() => setShowComposer(false)} className="rounded-lg p-2 text-[#9096a8] hover:bg-[#f5f6fa]" aria-label="Close"><X size={18}/></button></div><div className="flex items-center gap-3"><Avatar name="Arshiya Sharma" initials="AS"/><div><p className="text-[12px] font-bold">Arshiya Sharma</p><p className="text-[10px] text-[#9ca1b1]">Chandigarh University · Public</p></div></div><textarea value={draft} onChange={(event) => setDraft(event.target.value)} autoFocus placeholder="What's happening on campus?" className="mt-4 min-h-[145px] w-full resize-none rounded-xl border border-[#eceef4] bg-[#fafbfc] p-4 text-[13px] outline-none placeholder:text-[#a7acba] focus:border-[#b9bef3]"/><div className="mt-4 flex items-center justify-between"><button onClick={() => notify("Image upload is available when connected to Campus Hub.")} className="flex items-center gap-2 rounded-lg px-2 py-2 text-[11px] font-semibold text-[#6f758a] hover:bg-[#f7f8fb]"><ImagePlus size={17} className="text-[#64ad91]"/> Add photo</button><Button onClick={createPost} disabled={!draft.trim()} className="h-9 rounded-xl bg-[#626fe0] px-5 text-[11px] font-bold text-white hover:bg-[#535fcf]">Share post <Send size={14}/></Button></div></div></div>}

      {showSellForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20243a]/35 p-4 backdrop-blur-[2px]" onClick={() => setShowSellForm(false)}><div className="w-full max-w-[500px] rounded-[20px] bg-white p-5 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><div><h2 className="text-[17px] font-bold">List an item</h2><p className="mt-1 text-[11px] text-[#9a9fb0]">Reach students right here on campus.</p></div><button onClick={() => setShowSellForm(false)} className="rounded-lg p-2 text-[#9096a8] hover:bg-[#f5f6fa]" aria-label="Close"><X size={18}/></button></div><div className="mb-4 rounded-xl bg-[#f0f1ff] px-4 py-3 text-[10px] leading-relaxed text-[#676f9d]">Demo listing only. Items won't be published to a backend in this preview.</div><div className="space-y-3"><input placeholder="Item title" className="h-11 w-full rounded-xl border border-[#eceef4] px-3 text-[12px] outline-none focus:border-[#b9bef3]"/><div className="grid grid-cols-2 gap-3"><input placeholder="Price ($)" type="number" className="h-11 w-full rounded-xl border border-[#eceef4] px-3 text-[12px] outline-none focus:border-[#b9bef3]"/><select className="h-11 rounded-xl border border-[#eceef4] bg-white px-3 text-[12px] text-[#858ba0] outline-none"><option>Category</option><option>Electronics</option><option>Books</option><option>Furniture</option><option>Clothing</option><option>Other</option></select></div><textarea placeholder="Add a short description..." className="min-h-[90px] w-full rounded-xl border border-[#eceef4] p-3 text-[12px] outline-none focus:border-[#b9bef3]"/></div><Button onClick={() => { setShowSellForm(false); notify("Demo listing saved. Connect the marketplace API to publish items."); }} className="mt-4 h-10 w-full rounded-xl bg-[#626fe0] text-[12px] font-semibold text-white hover:bg-[#535fcf]">Save demo listing</Button></div></div>}
      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#272c48] px-4 py-3 text-[12px] font-medium text-white shadow-xl"><Check size={15} className="text-[#7cddb2]"/>{toast}</div>}
      <div className="sr-only"><Laptop/><X/><Bookmark/><Share2/><MessageSquare/><ShoppingBag/><BookOpen/></div>
    </div>
  );
}
