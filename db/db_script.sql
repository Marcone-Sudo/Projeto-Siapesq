PGDMP                         {         	   rickmorty    15.4    15.4 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398 	   rickmorty    DATABASE     �   CREATE DATABASE rickmorty WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE rickmorty;
                postgres    false            �            1259    16399 
   characters    TABLE     :  CREATE TABLE public.characters (
    id smallint NOT NULL,
    name character varying NOT NULL,
    image character varying,
    species character varying,
    gender character varying,
    origin character varying,
    status character varying,
    type character varying,
    created timestamp with time zone
);
    DROP TABLE public.characters;
       public         heap    postgres    false            �            1259    16406    characters_id_seq    SEQUENCE     �   ALTER TABLE public.characters ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.characters_id_seq
    START WITH 21
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �          0    16399 
   characters 
   TABLE DATA                 public          postgres    false    214   /	       �           0    0    characters_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.characters_id_seq', 25, true);
          public          postgres    false    215            f           2606    16405    characters characters_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.characters DROP CONSTRAINT characters_pkey;
       public            postgres    false    214            �   �  x�ݗ�R�:��y
�3�����UJSJ'���^q�X�-yd��>}%�r 2�7�Ibǖ����Z�tu3�ށ���/�YL+Q�E�4+�-�w8�6����8Nٌɹբ�w�W-d�����,�iZEZ?���J�kDX�:��h�g��a:J���G���ҝ|�5����PO�ﻋ�!����R<q@|z����Q(Y׿f3U}cKPq݋ [|ZԬ#�~�?bڔ��7+xͥ�=�B�s�`!J�잹�Q ��p���9�0L0�"8�ُ�L�(n-Y/��~����v�i@!�$3�y�ϝ�9��ʾ<���K}��8`Ji�y�z1!��h&�-U��A�+���W�k�.K�`4�������|�桻��:�)����ُ��� ��a�&O����R{V���~�)!!�c?�书�K���@������}��f>�,�C���Ni?�x�`G��� JPH2�������%%@}Jm1����ע-��j������~�H}�����9E��I��'D��R
�O�o�ou�����(� !��0 ?��uKådoI��{-�k��ұ��_�%[o�?�|��V���Yq��%J��y9��H-�+0Z�|V�lU?����^�NH)Z���mJӄ�i�Y�m?.^`�dQ�_����{��)�4N}���λ�ھ�~��ˣm�n����+�[�յ�k��N�(e��v_0��د8k��������[���`tn��k��	��a�r(u!"�o�a�2+J����Y.�a��/�Nu4��<Z6A�\i5Ѣ������<�I��G �R���ǶP�� >d]��&��Fz��ͷ���c�d���m�J����x`��+�;�\Z]��C���"#.�=���v̙Q��j{&�8_�t\ǣWI�$''��P�     