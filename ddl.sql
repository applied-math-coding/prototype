DROP TABLE IF EXISTS public.items;

CREATE TABLE IF NOT EXISTS public.items (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(50) NOT NULL,
    available boolean

);

INSERT INTO public.items(name, available) VALUES ('fruit tea', true)