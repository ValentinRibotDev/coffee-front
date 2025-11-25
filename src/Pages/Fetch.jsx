            /* const [userId, setUserId] = useState ([]);
           const [deleteUserId, setDeleteUserId] = useState ([]);
           const [patchUserId, setPatchUserId] = useState ([]);
            const [addFavoris, setAddFavoris] = useState ([]);
            const [favoris, setFavoris] = useState ([]);
        
        
        const fetchUserById = async () => {
            try {              
                const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUserId(data);
                }
            } 
            catch (err) {
                console.error("Erreur fetch des boissons :",err);
            }
        };

        const deleteUserById = async () => {
            try {              
                const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: "delete",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setDeleteUserId(data);
                }
            } 
            catch (err) {
                console.error("Erreur fetch des boissons :",err);
            }
        }; 
        
        const patchUserById = async () => {
            try {              
                const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                    method: "patch",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setPatchUserId(data);
                }
            } 
            catch (err) {
                console.error("Erreur fetch des boissons :",err);
            }
        };

        const addFavoris = async () => {
            try {              
                const res = await fetch("http://localhost:8080/api/favoris", {
                    method: "post",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setAddFavoris(data);
                }
            } 
            catch (err) {
                console.error("Erreur fetch des boissons :",err);
            }
        };

        const fetchFavoris = async () => {
            try {              
                const res = await fetch(`http://localhost:8080/api/favoris/${id}`, {
                    method: "get",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setFavoris(data);
                }
            } 
            catch (err) {
                console.error("Erreur fetch des boissons :",err);
            }
        };
        
        fetchUserById();
        deleteUserById();
        patchUserById();
        addFavoris();
        fetchFavoris(); */