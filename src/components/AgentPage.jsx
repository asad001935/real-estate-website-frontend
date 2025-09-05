import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AgentsPage() {
  const navigate = useNavigate();

  const protectNavigate = (e, action) => {
    const token = localStorage.getItem("token");

    if (!token) {
      e.preventDefault();
      Swal.fire({
        title: "Not Logged In",
        text: "You need to log in to continue.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    // if logged in → execute the action (open link)
    action();
  };

  const agents = [
    {
      id: 1,
      name: "Ali Khan",
      role: "Senior Property Advisor",
      phone: "+92 300 1234567",
      email: "ali@gmail.com",
      whatsapp: "https://wa.me/923001234567",
      experience: "10 years",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.g_PDBRbjJcIDDUENJgC35wHaE9?pid=Api&P=0&h=220",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      role: "Real Estate Consultant",
      phone: "+92 321 9876543",
      email: "sara@gmail.com",
      whatsapp: "https://wa.me/923219876543",
      experience: "7 years",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.uIrcfXQJn2FmdFBRgRp3UQHaEr?pid=Api&P=0&h=220",
    },
    {
      id: 3,
      name: "Usman Ali",
      role: "Property Dealer",
      phone: "+92 333 5554444",
      email: "usman@gmail.com",
      whatsapp: "https://wa.me/923335554444",
      experience: "5 years",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.mCQppcS89LdLnPHKcNdgpgHaLH?pid=Api&P=0&h=220",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Meet Our Agents
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {agent.name}
              </h2>
              <p className="text-gray-500">{agent.role}</p>
              <p className="text-sm text-gray-600 mt-1">
                Experience: {agent.experience}
              </p>

              <div className="mt-4 space-y-1 text-sm">
                <p>📞 {agent.phone}</p>
                <p>✉️ {agent.email}</p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={(e) =>
                    protectNavigate(e, () => window.location.href = `tel:${agent.phone}`)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Call
                </button>
                <button
                  onClick={(e) =>
                    protectNavigate(e, () => window.location.href = `mailto:${agent.email}`)
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Email
                </button>
                <button
                  onClick={(e) =>
                    protectNavigate(e, () =>
                      window.open(agent.whatsapp, "_blank")
                    )
                  }
                  className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
