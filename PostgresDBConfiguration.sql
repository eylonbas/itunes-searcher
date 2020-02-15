--create table search_history
CREATE TABLE public.search_history
(
    search_id serial,
	search_query character varying(100),
    search_time timestamp with time zone,
    PRIMARY KEY (search_id)
);
select * from search_history;

--insert function
create function sh_insert(_search_query character varying)
returns int as
$$
begin
	insert into search_history(search_query, search_time)
	values(_search_query, now());
	if found then --inserted successfully
		return 1;
	else return 0; --insert failed
	end if;
end
$$
language plpgsql
--test function insert
select * from sh_insert('Californication');
select * from sh_insert('Kanye West');

--select top 10 function
create or replace function sh_select_top_10()
returns table
(
	_search_query character varying,
	_search_count bigint
)as
$$
begin
	return query
	select search_query, count(search_query) as search_count
		from search_history 
		group by search_query
		order by search_count desc;
end
$$
language plpgsql
--test function select top 10
select * from sh_select_top_10();