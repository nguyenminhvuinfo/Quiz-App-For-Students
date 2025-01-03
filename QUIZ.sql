CREATE TABLE public.exam (
    exam_id text PRIMARY KEY,
    _name text,
    _type text,
    quanity integer,
    time_test integer
);

CREATE TABLE public.personal_information (
    account_id text PRIMARY KEY,
    role text DEFAULT 'student',
    fullname text,
    class text,
    email text,
    _address text,
    date_of_birth timestamp
);

CREATE TABLE public.question (
    exam_id text,
    content text,
    option_a text,
    option_b text,
    option_c text,
    option_d text,
    correct_answer char(1),
    PRIMARY KEY (exam_id, content),
    FOREIGN KEY (exam_id) REFERENCES public.exam (exam_id)
);

CREATE TABLE public.users (
    account_id text PRIMARY KEY,
    role text DEFAULT 'student',
    username text,
    pass_word text
);

CREATE TABLE public.student_score (
    account_id text,
    exam_id text,
    total float,
    PRIMARY KEY (account_id, exam_id),
    FOREIGN KEY (account_id) REFERENCES public.users (account_id),
    FOREIGN KEY (exam_id) REFERENCES public.exam (exam_id)
);

ALTER TABLE public.personal_information ADD CONSTRAINT fk_personal_information_user FOREIGN KEY (account_id) REFERENCES public.users (account_id);


