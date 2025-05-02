"use client";

import { motion } from "motion/react";
import MoreViewBtn from "@/components/ui/MoreViewBtn";
import { TitlePropsType } from "@/types/types";



export default function Title({ title, desc, moreView, children }: TitlePropsType) {
    return (
        <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="title-wrap">
                <div className="section-title">
                    <span>{title}</span>
                    {moreView && <MoreViewBtn link={"board"} />}
                </div>
                <div className="section-desc">{desc}</div>
                {children}
            </div>
        </motion.h2>
    );
}
