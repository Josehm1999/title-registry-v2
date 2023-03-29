import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import Image from 'next/image';

import title_registry_abi from '../../constants/TitleRegistry.json';
import { Card, useNotification } from 'web3uikit';
import { ethers } from 'ethers';

type TitleBoxProps = {
  state: string;
  district: string;
  neighborhood: string;
  surveyNumber: string;
  seller?: string;
  marketValue?: string;
  updatedAt: string;
};

// Function that shortens the address from the seller so it keeps inside the card

const truncate_string = (full_string: string, string_lenght: number) => {
  if (full_string.length <= string_lenght) return full_string;

  const separator = '...';
  const chars_to_show = string_lenght - separator.length;
  const front_chars = Math.ceil(chars_to_show / 2);
  const back_chars = Math.floor(chars_to_show / 2);
  return (
    full_string.substring(0, front_chars) +
    separator +
    full_string.substring(full_string.length - back_chars)
  );
};

const TitleBox: NextPage<TitleBoxProps> = ({
  state,
  district,
  neighborhood,
  surveyNumber,
  seller,
  marketValue,
  updatedAt,
}: TitleBoxProps) => {
  return <div></div>;
};

export default TitleBox
