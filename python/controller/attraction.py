import request.request as req

def add_attraction(data):
    print(data, flush=True)
    if not "nom" in data or data["nom"] == "":
        return False

    if not "description" in data or data["description"] == "":
        return False

    if not "difficulte" in data or data["difficulte"] is None:
        return False

    if not "visible" in data:
        data["visible"] = True

    if "attraction_id" in data and data["attraction_id"]:
        requete = f"UPDATE attraction SET nom='{data['nom']}', description='{data['description']}', difficulte={data['difficulte']}, visible={data['visible']} WHERE attraction_id = {data['attraction_id']}"
        req.insert_in_db(requete)
        id = data['attraction_id']
    else:
        requete = "INSERT INTO attraction (nom, description, difficulte, visible) VALUES (?, ?, ?, ?);"
        id = req.insert_in_db(requete, (data["nom"], data["description"], data["difficulte"], data["visible"]))

    return id

def get_all_attraction():
    json = req.select_from_db("SELECT * FROM attraction")
    return json

def get_attraction(id):
    if not id:
        return False

    json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_attraction(id):
    if not id:
        return False

    req.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (id,))
    return True

def getAllCritiques():
    sql_query = """
        SELECT critiques.*, attraction.nom AS attraction_nom
        FROM critiques
        LEFT JOIN attraction ON critiques.attraction_id = attraction.attraction_id
    """
    critiques = req.select_from_db(sql_query)
    return critiques

def add_critique(data):
    if "attraction_id" not in data or data["attraction_id"] == "":
        return False

    if "texte" not in data or data["texte"] == "":
        return False

    if "note" not in data or data["note"] is None:
        return False

    # Si l'auteur est anonyme, ne pas mettre de nom
    auteur = data["auteur"] if not data["anonyme"] else None

    requete = """
        INSERT INTO critiques (attraction_id, auteur, texte, note, anonyme)
        VALUES (?, ?, ?, ?, ?)
    """
    req.insert_in_db(requete, (data["attraction_id"], auteur, data["texte"], data["note"], data["anonyme"]))
    return True
