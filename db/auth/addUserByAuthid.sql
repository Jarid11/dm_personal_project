INSERT INTO users (name, authid, img) VALUES ($1, $2, $3) RETURNING *;